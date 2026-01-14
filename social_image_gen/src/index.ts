#!/usr/bin/env tsx
/**
 * Generate social media images for all articles using OpenAI DALL-E API.
 * Requires OPENAI_API_KEY environment variable to be set.
 *
 * Only generates images for articles that don't already have one.
 * Uses article title, tags, and description to build dynamic prompts.
 */

import { readdir, readFile, mkdir, access, writeFile } from "fs/promises";
import { join, basename, extname } from "path";
import OpenAI from "openai";
import sharp from "sharp";

// Configuration
const CONTENT_DIR = join("..", "content");
const DESCRIPTIONS_DIR = join("..", "descriptions");
const SOCIAL_IMG_DIR = join("..", "static", "social-img");
const IMAGE_SIZE = "1792x1024" as const; // DALL-E 3 landscape size, will resize to 1200x630
const TARGET_SIZE = { width: 1200, height: 630 }; // Open Graph standard size
const MODEL = "dall-e-3" as const;
const QUALITY = "standard" as const;
const STYLE = "vivid" as const;

interface ArticleMetadata {
  title: string;
  tags: string[];
  description: string;
}

/**
 * Extract article slug from file path.
 */
function getArticleSlug(filePath: string): string {
  return basename(filePath, extname(filePath));
}

/**
 * Check if a file exists.
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read article content and extract metadata for prompt generation.
 */
async function readArticleMetadata(filePath: string): Promise<ArticleMetadata> {
  const slug = getArticleSlug(filePath);
  const defaultMetadata: ArticleMetadata = {
    title: slug,
    tags: [],
    description: "",
  };

  try {
    const content = await readFile(filePath, "utf-8");

    // Find frontmatter boundaries
    const firstDelimiter = content.indexOf("+++");
    if (firstDelimiter === -1) {
      return defaultMetadata;
    }

    const secondDelimiter = content.indexOf("+++", firstDelimiter + 3);
    if (secondDelimiter === -1) {
      return defaultMetadata;
    }

    const frontmatter = content.slice(firstDelimiter + 3, secondDelimiter);
    const body = content.slice(secondDelimiter + 3).trim();

    // Extract title
    const titleMatch = frontmatter.match(/title\s*=\s*["']([^"']+)["']/);
    const title = titleMatch ? titleMatch[1] : slug;

    // Extract tags
    const tagsMatch = frontmatter.match(/tags\s*=\s*\[([^\]]*)\]/);
    let tags: string[] = [];
    if (tagsMatch) {
      const tagsStr = tagsMatch[1];
      // Parse tags like "tag1", "tag2" or 'tag1', 'tag2'
      const tagMatches = tagsStr.matchAll(/["']([^"']+)["']/g);
      tags = Array.from(tagMatches, (m) => m[1]);
    }

    // Extract description with priority:
    // 1. Inline description in frontmatter
    // 2. Content from description_file
    // 3. First paragraph of article body
    let description = "";

    // Check for inline description
    const descMatch = frontmatter.match(/\bdescription\s*=\s*["']([^"']+)["']/);
    if (descMatch) {
      description = descMatch[1];
    } else {
      // Check for description_file
      const descFileMatch = frontmatter.match(
        /description_file\s*=\s*["']([^"']+)["']/
      );
      if (descFileMatch) {
        const descFilePath = join("..", descFileMatch[1]);
        if (await fileExists(descFilePath)) {
          try {
            description = (await readFile(descFilePath, "utf-8")).trim();
          } catch {
            // Ignore read errors
          }
        }
      }

      // Fallback to first paragraph of body
      if (!description && body) {
        // Remove markdown formatting and get first meaningful paragraph
        let cleanBody = body.replace(/[#*\[\]()>`]/g, "");
        cleanBody = cleanBody.replace(/\{\{<[^>]+>\}\}/g, ""); // Remove shortcodes
        const lines = cleanBody
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l);
        if (lines.length > 0) {
          description = lines[0].slice(0, 200);
        }
      }
    }

    return { title, tags, description };
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e);
    return defaultMetadata;
  }
}

/**
 * Build a DALL-E prompt from article metadata.
 */
function buildPrompt(metadata: ArticleMetadata): string {
  const { title, tags, description } = metadata;

  // Build topics string from tags
  const topics = tags.length > 0 ? tags.join(", ") : "";

  return `Please crate an Open Graph image for our support article
Title: ${title}
Topics: ${topics}
Description: ${description}
Style: no text or words in the image, 1200x630 aspect ratio. Not AI slop. Please integrate logos and branding from the tools / games used.`;
}

/**
 * Generate an image using DALL-E and save it.
 */
async function generateImage(
  client: OpenAI,
  prompt: string,
  outputPath: string
): Promise<boolean> {
  try {
    console.log(`Generating image for: ${basename(outputPath)}`);
    console.log(`Full prompt:\n\n${prompt}\n`);

    const response = await client.images.generate({
      model: MODEL,
      prompt,
      size: IMAGE_SIZE,
      quality: QUALITY,
      style: STYLE,
      n: 1,
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      throw new Error("No image URL returned from API");
    }

    // Download image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Resize and save using sharp
    await sharp(imageBuffer)
      .resize(TARGET_SIZE.width, TARGET_SIZE.height, {
        fit: "cover",
        position: "center",
      })
      .png({ compressionLevel: 9 })
      .toFile(outputPath);

    console.log(
      `✓ Saved: ${outputPath} (${TARGET_SIZE.width}x${TARGET_SIZE.height})`
    );
    return true;
  } catch (e) {
    console.error(`✗ Error generating image for ${basename(outputPath)}:`, e);
    return false;
  }
}

async function main(): Promise<void> {
  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Error: OPENAI_API_KEY environment variable not set");
    console.error("Please set it with: export OPENAI_API_KEY='your-key-here'");
    process.exit(1);
  }

  // Initialize OpenAI client
  const client = new OpenAI({ apiKey });

  // Ensure output directory exists
  await mkdir(SOCIAL_IMG_DIR, { recursive: true });

  // Get all markdown files
  let articleFiles: string[];
  try {
    const files = await readdir(CONTENT_DIR);
    articleFiles = files
      .filter((f) => f.endsWith(".md"))
      .map((f) => join(CONTENT_DIR, f))
      .sort();
  } catch {
    console.error(`No markdown files found in ${CONTENT_DIR}`);
    process.exit(1);
  }

  if (articleFiles.length === 0) {
    console.error(`No markdown files found in ${CONTENT_DIR}`);
    process.exit(1);
  }

  console.log(`Found ${articleFiles.length} articles to process\n`);

  // Count existing and missing images
  let existingCount = 0;
  const missingFiles: string[] = [];

  for (const articleFile of articleFiles) {
    const slug = getArticleSlug(articleFile);
    const outputPath = join(SOCIAL_IMG_DIR, `${slug}.png`);
    if (await fileExists(outputPath)) {
      existingCount++;
    } else {
      missingFiles.push(articleFile);
    }
  }

  console.log(`Existing images: ${existingCount}`);
  console.log(`Missing images: ${missingFiles.length}\n`);

  if (missingFiles.length === 0) {
    console.log("All images already exist. Nothing to generate.");
    return;
  }

  // Process only missing articles
  let successCount = 0;
  for (const articleFile of missingFiles) {
    const slug = getArticleSlug(articleFile);
    const outputPath = join(SOCIAL_IMG_DIR, `${slug}.png`);

    // Read article metadata
    const metadata = await readArticleMetadata(articleFile);

    // Build prompt from metadata
    const prompt = buildPrompt(metadata);

    // Generate and save image
    if (await generateImage(client, prompt, outputPath)) {
      successCount++;
    }

    console.log(); // Blank line between articles
  }

  console.log(
    `\n✓ Generated ${successCount}/${missingFiles.length} images successfully`
  );
  console.log(`Images saved to: ${SOCIAL_IMG_DIR}`);
}

main();
