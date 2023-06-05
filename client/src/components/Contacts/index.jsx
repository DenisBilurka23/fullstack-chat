import { Box } from '@mui/material'
import ContactsTitle from './ContactsTitle'
import ContactsList from './ContactsList.'

const Contacts = ({ handleToggleModal }) => {
	return (
		<Box
			sx={{
				flexBasis: '30%',
				boxSizing: 'border-box',
				borderRight: '1px solid rgb(38, 38, 38)',
				height: '100%',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<ContactsTitle handleToggleModal={handleToggleModal} />
			<ContactsList />
		</Box>
	)
}

export default Contacts
