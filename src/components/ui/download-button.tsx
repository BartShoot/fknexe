import { ButtonLink } from '@/components/ui/button-link'
import GradientText from '@/components/ui/gradient-text'

export const DownloadButton = ({
  ...props
}: Omit<React.ComponentProps<typeof ButtonLink>, 'download' | 'variant'>) => {
  return (
    <ButtonLink {...props} download variant='download' size='download' rel={null} target={null}>
      <GradientText
        colors={['#ffccff', '#ffffcc', '#ccffff']}
        animationSpeed={3}
        showBorder={false}
        className='font-extrabold'
      >
        DOWNLOAD
      </GradientText>
    </ButtonLink>
  )
}
