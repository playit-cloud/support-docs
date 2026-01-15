#!/usr/bin/env tsx
/**
 * Generate social media images for all articles using OpenRouter with Gemini 3 Pro.
 * Requires OPENROUTER_API_KEY environment variable to be set.
 *
 * Only generates images for articles that don't already have one.
 * Uses article title, tags, and description to build dynamic prompts.
 */

import { mkdir } from "fs/promises";
import { join, basename } from "path";
import sharp from "sharp";
import {
  getArticleSlug,
  fileExists,
  getArticleFiles,
  readArticleMetadata,
  requireApiKey,
  type ArticleMetadata,
} from "./utils.js";

// Types for OpenRouter API response
type OpenRouterImage = {
  type: "image_url";
  image_url: { url: string };
};

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      role: string;
      content?: string;
      images?: OpenRouterImage[];
    };
  }>;
  error?: { message?: string };
};

/**
 * Convert a base64 data URL to a Buffer.
 */
function dataUrlToBuffer(dataUrl: string): { mime: string; buf: Buffer } {
  const m = dataUrl.match(/^data:(.+?);base64,(.+)$/);
  if (!m) throw new Error("Expected a base64 data URL like data:image/png;base64,...");
  const mime = m[1];
  const b64 = m[2];
  return { mime, buf: Buffer.from(b64, "base64") };
}

// Configuration
const SOCIAL_IMG_DIR = join("..", "static", "social-img");
const TARGET_SIZE = { width: 1200, height: 630 }; // Open Graph standard size
const MODEL = "google/gemini-3-pro-image-preview";

/**
 * Build a prompt from article metadata.
 */
function buildPrompt(metadata: ArticleMetadata): string {
  const { title, description } = metadata;

  return `Please create an Open Graph image for our support article "${title}". Should be dark theme'd lofi pixel art image with retro terminal vibe. Pixel Art! The image should contain no text or words! No words! Do not include the playit or playit.gg logo. The only text should be official brand logos if they are explicity mentioned in the description! Do not add words! Image should be simple and should look good at 10% zoom. Simple! Image should fill entire canvas, no cropping! If the guide is related to a game, make the background of the image themed for the game in question. Image should be simple and not cluttered!
Title: ${title}
Description: ${description}`;
}

/**
 * Generate an image using OpenRouter with direct fetch API and save it.
 * Throws on error to fail fast.
 */
async function generateImage(
  apiKey: string,
  prompt: string,
  outputPath: string
): Promise<void> {
  console.log(`Generating image for: ${basename(outputPath)}`);
  console.log(`Full prompt:\n\n${prompt}\n`);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://playit.gg",
      "X-Title": "playit.gg Social Image Generator",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      modalities: ["image", "text"],
      image_config: {
        aspect_ratio: "16:9",
        image_size: "1K",
      },
      stream: false,
    }),
  });

  const json = (await res.json()) as OpenRouterResponse;

  // Log raw response for debugging
  console.log("Raw API response:");
  console.log(JSON.stringify(json, null, 2));

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${json?.error?.message ?? JSON.stringify(json)}`);
  }

  const msg = json.choices?.[0]?.message;
  const firstImageUrl = msg?.images?.[0]?.image_url?.url;

  if (!firstImageUrl) {
    throw new Error(
      `No image returned. Message content was: ${JSON.stringify(msg, null, 2)}`
    );
  }

  console.log(`Found image URL: ${firstImageUrl.substring(0, 80)}...`);

  // OpenRouter returns images as base64 data URLs
  const { buf: imageBuffer } = dataUrlToBuffer(firstImageUrl);

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
}

async function main(): Promise<void> {
  const apiKey = requireApiKey();

  // Ensure output directory exists
  await mkdir(SOCIAL_IMG_DIR, { recursive: true });

  // Get all markdown files
  let articleFiles: string[];
  try {
    articleFiles = await getArticleFiles();
  } catch {
    console.error("No markdown files found in content directory");
    process.exit(1);
  }

  if (articleFiles.length === 0) {
    console.error("No markdown files found in content directory");
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
  for (const articleFile of missingFiles) {
    const slug = getArticleSlug(articleFile);
    const outputPath = join(SOCIAL_IMG_DIR, `${slug}.png`);

    // Read article metadata
    const metadata = await readArticleMetadata(articleFile);

    // Build prompt from metadata
    const prompt = buildPrompt(metadata);

    // Generate and save image - fail fast on error
    try {
      await generateImage(apiKey, prompt, outputPath);
    } catch (e) {
      console.error(`\n✗ Fatal error generating image for ${slug}:`, e);
      process.exit(1);
    }

    console.log(); // Blank line between articles
  }

  console.log(`\n✓ Generated ${missingFiles.length} images successfully`);
  console.log(`Images saved to: ${SOCIAL_IMG_DIR}`);
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
