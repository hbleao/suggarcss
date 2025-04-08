import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { RootProps } from './types'

/**
 * Root container for BannerBody component
 * 
 * @example
 * <BannerBody.Root bgColor={bgColor} theme={theme}>
 *   <BannerBody.Content>
 *     {preTitle && <BannerBody.Pretitle>{preTitle}</BannerBody.Pretitle>}
 *     {title && <BannerBody.Title>{title}</BannerBody.Title>}
 *     {subtitle && <BannerBody.Subtitle>{subtitle}</BannerBody.Subtitle>}
 * 
 *     <BannerBody.Benefits>
 *       {bannerText?.map((banner: any) => (
 *         <React.Fragment key={banner.plainText}>
 *           <BannerBody.Benefit>
 *             {banner.iconText && (
 *               <Icon iconName={banner.iconText} size="text-md" />
 *             )}
 *             <BannerBody.Text>{banner.plainText}</BannerBody.Text>
 *           </BannerBody.Benefit>
 *         </React.Fragment>
 *       ))}
 *     </BannerBody.Benefits>
 * 
 *     <BannerBody.Buttons>
 *       {buttonText1 && (
 *         <Button
 *           onClick={() => onClick(buttonLink1!, buttonTarget1!)}
 *           styles={'primary'}
 *           variant={'insurance'}
 *         >
 *           {buttonText1}
 *         </Button>
 *       )}
 *       {textNote && <BannerBody.TextNote>{textNote}</BannerBody.TextNote>}
 *     </BannerBody.Buttons>
 *   </BannerBody.Content>
 *   <BannerBody.Image>
 *     <img src={imageBannerRef} alt={imageBannerAlt} />
 *   </BannerBody.Image>
 * </BannerBody.Root>
 * 
 * @param {string} [theme='light'] - Color theme of the banner ('light' | 'dark')
 * @param {string} [bgColor='offWhite05'] - Background color of the banner
 * @param {string} [imageDesktopPosition='left'] - Image position on desktop ('left' | 'right')
 * @param {string} [imageMobilePosition='down'] - Image position on mobile ('up' | 'down')
 * @param {string} [className=''] - Additional CSS class
 * @param {ReactNode} children - Content of the banner
 */
export const Root = ({
  theme = 'light',
  bgColor = 'offWhite05',
  imageDesktopPosition = 'left',
  imageMobilePosition = 'down',
  className = '',
  children,
  ...restProps
}: RootProps) => {
  return (
    <section
      className={joinClasses([
        'banner-body__root',
        `--${theme}`,
        `--bg-${bgColor}`,
        imageMobilePosition,
        imageDesktopPosition,
        className,
      ])}
      {...restProps}
    >
      {children}
    </section>
  )
}
