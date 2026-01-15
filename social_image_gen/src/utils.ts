/**
 * Shared utilities for social image and description generation.
 */

import { readdir, readFile, access } from "fs/promises";
import { join, basename, extname } from "path";

// Configuration
export const CONTENT_DIR = join("..", "content");
export const DESCRIPTIONS_DIR = join("..", "descriptions");

/**
 * Article metadata extracted from frontmatter.
 */
export type ArticleMetadata = {
  title: string;
  tags: string[];
  description: string;
  hasDescriptionFile: boolean;
  hasInlineDescription: boolean;
  descriptionFilePath: string | null;
  descriptionFileExists: boolean;
  body: string;
};

/**
 * Extract article slug from file path.
 */
export function getArticleSlug(filePath: string): string {
  return basename(filePath, extname(filePath));
}

/**
 * Check if a file exists.
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all markdown article files from the content directory.
 */
export async function getArticleFiles(): Promise<string[]> {
  const files = await readdir(CONTENT_DIR);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => join(CONTENT_DIR, f))
    .sort();
}

/**
 * Read article content and extract metadata.
 */
export async function readArticleMetadata(filePath: string): Promise<ArticleMetadata> {
  const slug = getArticleSlug(filePath);
  const defaultMetadata: ArticleMetadata = {
    title: slug,
    tags: [],
    description: "",
    hasDescriptionFile: false,
    hasInlineDescription: false,
    descriptionFilePath: null,
    descriptionFileExists: false,
    body: "",
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

    // Check for inline description
    const descMatch = frontmatter.match(/\bdescription\s*=\s*["']([^"']+)["']/);
    const hasInlineDescription = !!descMatch;

    // Check for description_file
    const descFileMatch = frontmatter.match(
      /description_file\s*=\s*["']([^"']+)["']/
    );
    const hasDescriptionFile = !!descFileMatch;
    const descriptionFilePath = descFileMatch ? descFileMatch[1] : null;
    let descriptionFileExists = false;

    // Extract description with priority:
    // 1. Inline description in frontmatter
    // 2. Content from description_file
    // 3. First paragraph of article body
    let description = "";

    if (descMatch) {
      description = descMatch[1];
    } else if (descFileMatch) {
      const descFileFullPath = join("..", descFileMatch[1]);
      descriptionFileExists = await fileExists(descFileFullPath);
      if (descriptionFileExists) {
        try {
          description = (await readFile(descFileFullPath, "utf-8")).trim();
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

    return { title, tags, description, hasDescriptionFile, hasInlineDescription, descriptionFilePath, descriptionFileExists, body };
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e);
    return defaultMetadata;
  }
}

/**
 * Ensure OPENROUTER_API_KEY is set. Exits process if not.
 */
export function requireApiKey(): string {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("Error: OPENROUTER_API_KEY environment variable not set");
    console.error("Please set it with: export OPENROUTER_API_KEY='your-key-here'");
    process.exit(1);
  }
  return apiKey;
}
