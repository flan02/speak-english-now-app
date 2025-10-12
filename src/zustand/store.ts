import { ScheduleTimeProps } from "@/lib/types"
import { create } from "zustand"

interface PremiumModalState {
  open: boolean
  setOpen: (open: boolean) => void
}

interface AddPhotoState {
  showImage: boolean
  setShowImage: (show: boolean) => void
}

export const storePremiumModal = create<PremiumModalState>((set) => ({ open: false, setOpen: (open: boolean) => set({ open }) }))
export const storeAddPhoto = create<AddPhotoState>((set) => ({ showImage: true, setShowImage: (show: boolean) => set({ showImage: show }) }))

interface PaymentData {
  payment: boolean
  setPayment: (payment: boolean) => void
  isGroupClass: boolean
  setIsGroupClass: (isGroup: boolean) => void
  selectedDate: string | null
  setSelectedDate: (date: string | null) => void
  studentsCount: number
  setStudentsCount: (count: number) => void
  price: number
  setPrice: (price: number) => void
  scheduledTime: ScheduleTimeProps
  setScheduledTime: (time: ScheduleTimeProps) => void
}

export const storePaymentData = create<PaymentData>((set) => ({
  payment: false,
  setPayment: (payment: boolean) => set({ payment }),
  isGroupClass: false,
  setIsGroupClass: (isGroup: boolean) => set({ isGroupClass: isGroup }),
  selectedDate: null,
  setSelectedDate: (date: string | null) => set({ selectedDate: date }),
  studentsCount: 0,
  setStudentsCount: (count: number) => set({ studentsCount: count }),
  price: 12000,
  setPrice: (price: number) => set({ price }),
  scheduledTime: { start: null, end: null },
  setScheduledTime: (time: ScheduleTimeProps) => set({ scheduledTime: time }),
}))

