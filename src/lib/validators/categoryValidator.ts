import { z } from "zod"

export const CATEGORY_NAME_VALIDATOR = z
  .string()
  .min(1, "category name is required")
  .regex(
    /^[a-zA-z0-9-]+$/,
    "category name can only contain letters, numbers and hyphen"
  )
export const CATEGORY_COLOR_VALIDATOR = z
  .string()
  .min(1, "Color is required")
  .regex(/^#[0-9A-F]{6}$/i, "invalid color format")
export const CATEGORY_EMOJI_VALIDATOR = z
  .string()
  .emoji("Invalid emoji")
  .optional()
