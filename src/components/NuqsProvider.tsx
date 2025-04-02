import { NuqsAdapter } from 'nuqs/adapters/react'

type WrappedComponentProps = React.ComponentProps<any>

export const withNuqsAdapter =
  <P extends WrappedComponentProps>(WrappedComponent: React.ComponentType<P>) =>
  (props: P) => (
    <NuqsAdapter>
      {/* @ts-expect-error wrong types */}
      <WrappedComponent {...props} />
    </NuqsAdapter>
  )
