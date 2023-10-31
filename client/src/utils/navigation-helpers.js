import { Settings, Logout, Home } from '@mui/icons-material'

export const navItems = [
	{
		title: 'Main',
		Icon: Home,
		link: '/'
	},
	{
		title: 'Account settings',
		Icon: Settings,
		link: '/settings'
	},
	{
		title: 'Logout',
		Icon: Logout,
		link: '/sign-out'
	}
]
