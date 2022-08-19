import styled from 'styled-components'

export const StyledIcon = styled.img<{ size: string }>`
  display: inline-block;
  min-height: ${(props) => props.size || '1rem'};
  min-width: ${(props) => props.size || '1rem'};
`

type Props = {
  url: string
  size?: string
}
export default function Icon({ url, size = '1rem' }: Props) {
  return <StyledIcon size={size} src={url}></StyledIcon>
}
