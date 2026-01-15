#!/usr/bin/env tsx
/**
 * Generate descriptions for all articles using OpenRouter with Gemini 2.5 Flash.
 * Requires OPENROUTER_API_KEY environment variable to be set.
 *
 * Only generates descriptions for articles that don't already have one.
 * Writes descriptions to descriptions/{slug}.txt and updates article frontmatter.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import {
  DESCRIPTIONS_DIR,
  getArticleSlug,
  getArticleFiles,
  readArticleMetadata,
  requireApiKey,
} from "./utils.js";

// Types for OpenRouter API response
type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      role: string;
      content?: string;
    };
  }>;
  error?: { message?: string };
};

// Configuration
const MODEL = "google/gemini-2.5-flash";

/**
 * Build a prompt to generate a description for an article.
 */
function buildPrompt(title: string, body: string): string {
  // Truncate body to avoid token limits
  const truncatedBody = body.slice(0, 4000);

  return `Write a single-sentence description (under 160 characters) for the following support article. The description should be concise, informative, and suitable for SEO meta descriptions. Do not include quotes around your response.

Title: ${title}

Article content:
${truncatedBody}`;
}

/**
 * Generate a description using OpenRouter.
 */
async function generateDescription(
  apiKey: string,
  title: string,
  body: string
): Promise<string> {
  const prompt = buildPrompt(title, body);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://playit.gg",
      "X-Title": "playit.gg Description Generator",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
    }),
  });

  const json = (await res.json()) as OpenRouterResponse;

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${json?.error?.message ?? JSON.stringify(json)}`);
  }

  const content = json.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error(`No content returned. Response was: ${JSON.stringify(json, null, 2)}`);
  }

  // Clean up the response - remove quotes if present
  return content.trim().replace(/^["']|["']$/g, "");
}

/**
 * Update the frontmatter of an article to add description_file reference.
 */
async function updateArticleFrontmatter(
  filePath: string,
  descriptionFileName: string
): Promise<void> {
  const content = await readFile(filePath, "utf-8");

  // Find frontmatter boundaries
  const firstDelimiter = content.indexOf("+++");
  if (firstDelimiter === -1) {
    throw new Error(`No frontmatter found in ${filePath}`);
  }

  const secondDelimiter = content.indexOf("+++", firstDelimiter + 3);
  if (secondDelimiter === -1) {
    throw new Error(`Incomplete frontmatter in ${filePath}`);
  }

  const frontmatter = content.slice(firstDelimiter + 3, secondDelimiter);
  const afterFrontmatter = content.slice(secondDelimiter);

  // Add description_file line before the closing +++
  const descriptionLine = `description_file = "descriptions/${descriptionFileName}"`;
  const updatedFrontmatter = frontmatter.trimEnd() + "\n" + descriptionLine + "\n";

  const updatedContent = "+++" + updatedFrontmatter + afterFrontmatter;

  await writeFile(filePath, updatedContent, "utf-8");
}

async function main(): Promise<void> {
  const apiKey = requireApiKey();

  // Ensure descriptions directory exists
  await mkdir(DESCRIPTIONS_DIR, { recursive: true });

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

  // Find articles missing descriptions
  const missingDescriptions: Array<{
    file: string;
    slug: string;
    title: string;
    body: string;
    descriptionFilePath: string | null;
    needsFrontmatterUpdate: boolean;
  }> = [];
  let existingCount = 0;

  for (const articleFile of articleFiles) {
    const metadata = await readArticleMetadata(articleFile);

    // Skip if article has inline description
    if (metadata.hasInlineDescription) {
      existingCount++;
      continue;
    }

    // Skip if description_file is set AND the file exists
    if (metadata.hasDescriptionFile && metadata.descriptionFileExists) {
      existingCount++;
      continue;
    }

    const slug = getArticleSlug(articleFile);

    // If description_file is set but file doesn't exist, use that path
    // Otherwise, we'll create a new path and update frontmatter
    const descriptionFilePath = metadata.descriptionFilePath;
    const needsFrontmatterUpdate = !metadata.hasDescriptionFile;

    missingDescriptions.push({
      file: articleFile,
      slug,
      title: metadata.title,
      body: metadata.body,
      descriptionFilePath,
      needsFrontmatterUpdate,
    });
  }

  console.log(`Articles with descriptions: ${existingCount}`);
  console.log(`Articles missing descriptions: ${missingDescriptions.length}\n`);

  if (missingDescriptions.length === 0) {
    console.log("All articles already have descriptions. Nothing to generate.");
    return;
  }

  // Process articles missing descriptions
  for (const article of missingDescriptions) {
    console.log(`Generating description for: ${article.slug}`);

    try {
      // Generate description
      const description = await generateDescription(apiKey, article.title, article.body);
      console.log(`  Description: ${description}`);

      // Determine the description file path
      // Use existing path from frontmatter if available, otherwise create new one
      const descFilePath = article.descriptionFilePath
        ? join("..", article.descriptionFilePath)
        : join(DESCRIPTIONS_DIR, `${article.slug}.txt`);

      await writeFile(descFilePath, description, "utf-8");
      console.log(`  ✓ Wrote: ${descFilePath}`);

      // Only update frontmatter if description_file wasn't already set
      if (article.needsFrontmatterUpdate) {
        const descFileName = `${article.slug}.txt`;
        await updateArticleFrontmatter(article.file, descFileName);
        console.log(`  ✓ Updated frontmatter: ${article.file}`);
      }

      console.log(); // Blank line between articles
    } catch (e) {
      console.error(`\n✗ Fatal error generating description for ${article.slug}:`, e);
      process.exit(1);
    }
  }

  console.log(`\n✓ Generated ${missingDescriptions.length} descriptions successfully`);
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
