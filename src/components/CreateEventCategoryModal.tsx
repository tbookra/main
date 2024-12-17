"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { PropsWithChildren, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  CATEGORY_NAME_VALIDATOR,
  CATEGORY_COLOR_VALIDATOR,
  CATEGORY_EMOJI_VALIDATOR,
} from "@/lib/validators/categoryValidator"
import { Modal } from "./ui/model"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { client } from "@/lib/client"
import CustomInput from "./CustomInput"
import CustomCheckbox from "./CustomCheckbox"

const EVENT_CATEGORY_VALIDATOR = z.object({
  name: CATEGORY_NAME_VALIDATOR,
  color: CATEGORY_COLOR_VALIDATOR,
  emoji: CATEGORY_EMOJI_VALIDATOR,
})

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR>

const COLOR_OPTIONS = [
  // the comments are there to allow tailwind to prepare them!!! otherwise it'll wont work dynamically
  "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
  "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
  "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
  "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
  "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
  "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
  "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
  "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
  "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
  "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
]

const EMOJI_OPTIONS = [
  { emoji: "💰", label: "Money (Sale)" },
  { emoji: "👤", label: "User (Sign-up)" },
  { emoji: "🎉", label: "Celebration" },
  { emoji: "📅", label: "Calendar" },
  { emoji: "🚀", label: "Launch" },
  { emoji: "📢", label: "Announcement" },
  { emoji: "🎓", label: "Graduation" },
  { emoji: "🏆", label: "Achievement" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🔔", label: "Notification" },
]
interface CreateEventCategoryModel extends PropsWithChildren {
  containerClassName?: string
}
export const CreateEventCategoryModal = ({
  children,
  containerClassName,
}: CreateEventCategoryModel) => {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const queryClient = useQueryClient()
  const methods = useForm<EventCategoryForm>({
    resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
  })
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods
  const { mutate: createEventCategoryFn, isPending } = useMutation({
    mutationFn: async (data: EventCategoryForm) => {
      await client.category.createEventCategory.$post(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
      setIsOpen(false)
    },
  })

  const onSubmit = (data: EventCategoryForm) => {
    if (confirmed) {
      createEventCategoryFn(data)
      setConfirmed(false)
      setErrorMessage("")
    } else {
      setErrorMessage("You need to confirm")
    }
  }

  return (
    <>
      <div className={containerClassName} onClick={() => setIsOpen(true)}>
        {children}
      </div>

      <Modal
        showModal={isOpen}
        setShowModal={setIsOpen}
        className="max-w-xl p-8"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
                New Event Category
              </h2>
              <p className="text-sm/6 text-gray-600">
                Create a new category to organize your events.
              </p>
            </div>
            <div className="space-y-5">
              <div>
                <div>
                  <CustomInput
                    name="name"
                    label="Name"
                    placeholder="e.g user-signup"
                    required
                  />
                </div>

                <Label>Color</Label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_OPTIONS.map((premadeColor) => (
                    <button
                      key={premadeColor}
                      type="button"
                      className={cn(
                        `bg-[${premadeColor}]`,
                        "size-10 rounded-full ring-2 ring-offset-2 transition-all",
                        watch("color") === premadeColor
                          ? "ring-brand-700 scale-110"
                          : "ring-transparent hover:scale-105"
                      )}
                      onClick={() => setValue("color", premadeColor)}
                    ></button>
                  ))}
                </div>
                {errors.color ? (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.color.message}
                  </p>
                ) : null}
              </div>
              <div>
                <Label>Emoji</Label>
                <div className="flex flex-wrap gap-3">
                  {EMOJI_OPTIONS.map(({ emoji, label }) => (
                    <button
                      key={emoji}
                      type="button"
                      className={cn(
                        "size-10 flex items-center justify-center text-xl rounded-md transition-all",
                        watch("emoji") === emoji
                          ? "bg-brand-100 ring-2 ring-brand-700 scale-110"
                          : "bg-brand-100 hover:bg-brand-200"
                      )}
                      onClick={() => setValue("emoji", emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                {errors.emoji ? (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.emoji.message}
                  </p>
                ) : null}
              </div>
              <CustomCheckbox
                setChecked={setConfirmed}
                checked={confirmed}
                name="Confirm"
              />
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  )
}
