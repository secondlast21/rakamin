export function setColor(isError: boolean) {
  switch (isError) {
    case true:
      return 'focus:outline-none focus:border-danger-default focus:caret-danger-default'
    case false:
      return 'border-neutral-40 focus:outline-none focus:border-primary-default focus:caret-primary-default hover:border-primary-border'
  }
}

export function setButtonVariant(variant: string) {
  switch (variant) {
    case 'primary':
      return 'bg-primary-default shadow-sm text-white hover:bg-primary-border hover:bg-primary-dark'
    case 'neutral':
      return 'bg-white border-2 border-primary-default border-neutral-40 shadow-sm text-neutral-100 hover:bg-neutral-40'
    case 'danger':
      return 'bg-danger-default shadow-sm text-white hover:bg-danger-dark'
    case 'text':
      return 'text-neutral-100'
  }
}

export function setColorTodo(color: string | undefined): any {
  switch (color) {
    case 'green':
      return {
        background: 'bg-primary-surface border-primary-border',
        header: 'text-primary-default border-primary-default',
      }
    case 'yellow':
      return {
        background: 'bg-secondary-surface border-secondary-border',
        header: 'text-secondary-default border-secondary-default',
      }
    case 'red':
      return {
        background: 'bg-danger-surface border-danger-border',
        header: 'text-danger-default border-danger-default',
      }
    case 'lightGreen':
      return {
        background: 'bg-success-surface border-success-border',
        header: 'text-success-default border-success-default',
      }
    default:
      return {
        background: 'bg-primary-surface border-primary-border',
        header: 'text-primary-default border-primary-default',
      }
  }
}
