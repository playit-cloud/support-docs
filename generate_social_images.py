#!/usr/bin/env python3
"""
Generate social media images for all articles using OpenAI DALL-E API.
Requires OPENAI_API_KEY environment variable to be set.

Only generates images for articles that don't already have one.
Uses article title, tags, and description to build dynamic prompts.
"""

import os
import sys
import re
import tempfile
from pathlib import Path
from openai import OpenAI
from urllib.request import urlretrieve
from PIL import Image

# Configuration
CONTENT_DIR = Path("content")
DESCRIPTIONS_DIR = Path("descriptions")
SOCIAL_IMG_DIR = Path("static/social-img")
IMAGE_SIZE = "1792x1024"  # DALL-E 3 landscape size, will resize to 1200x630
TARGET_SIZE = (1200, 630)  # Open Graph standard size
MODEL = "dall-e-3"
QUALITY = "standard"
STYLE = "vivid"


def get_article_slug(file_path):
    """Extract article slug from file path."""
    return file_path.stem


def read_article_metadata(file_path):
    """
    Read article content and extract metadata for prompt generation.
    
    Returns:
        dict with keys: title, tags, description
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find frontmatter boundaries
        first_delimiter = content.find('+++')
        if first_delimiter == -1:
            return {"title": file_path.stem, "tags": [], "description": ""}
        
        second_delimiter = content.find('+++', first_delimiter + 3)
        if second_delimiter == -1:
            return {"title": file_path.stem, "tags": [], "description": ""}
        
        frontmatter = content[first_delimiter + 3:second_delimiter]
        body = content[second_delimiter + 3:].strip()
        
        # Extract title
        title_match = re.search(r'title\s*=\s*["\']([^"\']+)["\']', frontmatter)
        title = title_match.group(1) if title_match else file_path.stem
        
        # Extract tags
        tags_match = re.search(r'tags\s*=\s*\[([^\]]*)\]', frontmatter)
        tags = []
        if tags_match:
            tags_str = tags_match.group(1)
            # Parse tags like "tag1", "tag2" or 'tag1', 'tag2'
            tags = re.findall(r'["\']([^"\']+)["\']', tags_str)
        
        # Extract description with priority:
        # 1. Inline description in frontmatter
        # 2. Content from description_file
        # 3. First paragraph of article body
        description = ""
        
        # Check for inline description
        desc_match = re.search(r'\bdescription\s*=\s*["\']([^"\']+)["\']', frontmatter)
        if desc_match:
            description = desc_match.group(1)
        else:
            # Check for description_file
            desc_file_match = re.search(r'description_file\s*=\s*["\']([^"\']+)["\']', frontmatter)
            if desc_file_match:
                desc_file_path = Path(desc_file_match.group(1))
                if desc_file_path.exists():
                    try:
                        with open(desc_file_path, 'r', encoding='utf-8') as df:
                            description = df.read().strip()
                    except Exception:
                        pass
            
            # Fallback to first paragraph of body
            if not description and body:
                # Remove markdown formatting and get first meaningful paragraph
                clean_body = re.sub(r'[#*\[\]()>`]', '', body)
                clean_body = re.sub(r'\{\{<[^>]+>\}\}', '', clean_body)  # Remove shortcodes
                lines = [l.strip() for l in clean_body.split('\n') if l.strip()]
                if lines:
                    description = lines[0][:200]
        
        return {
            "title": title,
            "tags": tags,
            "description": description
        }
    
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return {"title": file_path.stem, "tags": [], "description": ""}


def build_prompt(metadata):
    """
    Build a DALL-E prompt from article metadata.
    
    Args:
        metadata: dict with title, tags, description
    
    Returns:
        Prompt string for image generation
    """
    title = metadata.get("title", "")
    tags = metadata.get("tags", [])
    description = metadata.get("description", "")
    
    # Build topics string from tags
    topics = ", ".join(tags) if tags else "technology"
    
    prompt = f"""Create a modern, professional Open Graph image for a tech support article.

Title: {title}
Topics: {topics}
Description: {description}

Style: Clean illustration, tech-friendly aesthetic, vibrant colors, no text or words in the image, abstract representation of the concept, modern design, 1200x630 aspect ratio."""
    
    return prompt


def generate_image(client, prompt, output_path):
    """Generate an image using DALL-E and save it."""
    try:
        print(f"Generating image for: {output_path.name}")
        print(f"Prompt preview: {prompt[:150]}...")
        
        response = client.images.generate(
            model=MODEL,
            prompt=prompt,
            size=IMAGE_SIZE,
            quality=QUALITY,
            style=STYLE,
            n=1,
        )
        
        image_url = response.data[0].url
        
        # Download image to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as tmp_file:
            urlretrieve(image_url, tmp_file.name)
            temp_path = tmp_file.name
        
        try:
            # Open, resize, and save
            with Image.open(temp_path) as img:
                # Resize to target size with high-quality resampling
                img_resized = img.resize(TARGET_SIZE, Image.Resampling.LANCZOS)
                img_resized.save(output_path, "PNG", optimize=True)
        finally:
            # Clean up temporary file
            os.unlink(temp_path)
        
        print(f"✓ Saved: {output_path} ({TARGET_SIZE[0]}x{TARGET_SIZE[1]})")
        return True
    except Exception as e:
        print(f"✗ Error generating image for {output_path.name}: {e}")
        return False


def main():
    # Check for API key
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Error: OPENAI_API_KEY environment variable not set")
        print("Please set it with: export OPENAI_API_KEY='your-key-here'")
        sys.exit(1)
    
    # Initialize OpenAI client
    client = OpenAI(api_key=api_key)
    
    # Ensure output directory exists
    SOCIAL_IMG_DIR.mkdir(parents=True, exist_ok=True)
    
    # Get all markdown files
    article_files = list(CONTENT_DIR.glob("*.md"))
    
    if not article_files:
        print(f"No markdown files found in {CONTENT_DIR}")
        sys.exit(1)
    
    print(f"Found {len(article_files)} articles to process\n")
    
    # Count existing and missing images
    existing_count = 0
    missing_files = []
    
    for article_file in sorted(article_files):
        slug = get_article_slug(article_file)
        output_path = SOCIAL_IMG_DIR / f"{slug}.png"
        if output_path.exists():
            existing_count += 1
        else:
            missing_files.append(article_file)
    
    print(f"Existing images: {existing_count}")
    print(f"Missing images: {len(missing_files)}\n")
    
    if not missing_files:
        print("All images already exist. Nothing to generate.")
        return
    
    # Process only missing articles
    success_count = 0
    for article_file in missing_files:
        slug = get_article_slug(article_file)
        output_path = SOCIAL_IMG_DIR / f"{slug}.png"
        
        # Read article metadata
        metadata = read_article_metadata(article_file)
        
        # Build prompt from metadata
        prompt = build_prompt(metadata)
        
        # Generate and save image
        if generate_image(client, prompt, output_path):
            success_count += 1
        
        print()  # Blank line between articles
    
    print(f"\n✓ Generated {success_count}/{len(missing_files)} images successfully")
    print(f"Images saved to: {SOCIAL_IMG_DIR}")


if __name__ == "__main__":
    main()
