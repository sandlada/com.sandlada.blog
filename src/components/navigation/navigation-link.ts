import BookOS from '@material-design-icons/svg/outlined/book.svg?raw';
import HomeOS from '@material-design-icons/svg/outlined/home.svg?raw';
import BookRS from '@material-design-icons/svg/round/book.svg?raw';
import HomeRS from '@material-design-icons/svg/round/home.svg?raw';

export type TNavigationLink = {
    label: string
    activeIcon: unknown
    inactiveIcon: unknown
    href: string
}

export const NavigationLinkRecord: Readonly<Record<string, TNavigationLink>> = {
    Home: {
        activeIcon: HomeRS,
        inactiveIcon: HomeOS,
        href: '/',
        label: 'Home'
    },
    articles: {
        activeIcon: BookRS,
        inactiveIcon: BookOS,
        href: '/articles/',
        label: 'Articles'
    }
} as const
