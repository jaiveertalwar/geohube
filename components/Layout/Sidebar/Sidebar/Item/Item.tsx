import { FC, ReactNode } from 'react'
import { StyledItem } from '.'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icon } from '../../../../System'

type Props = {
  text: string
  icon: ReactNode
  route: string
}

const Item: FC<Props> = ({ text, icon, route }) => {
  const router = useRouter()
  const isActive = `/${router.pathname.split('/')[1]}` === route
  
  return (
    <StyledItem isActive={isActive}>
      <Link href={route}>
        <a className="item">
          <Icon size={24} fill={isActive ? '#AEB1B5' : ''}>{icon}</Icon>  
          <span className="itemText">{text}</span>
        </a>
      </Link>
    </StyledItem>
  )
}

export default Item