export interface SingleToast {
  id: string
  message: string
}

export type SingleToastLike = Omit<SingleToast, "id">

export type AddToastCallback = (toast: SingleToastLike) => void

export interface ToasterProviderValue {
  state: {
    toastList: SingleToast[]
  }
  actions: {
    addToast: AddToastCallback
    removeToast: (id: string) => void
  }
}
