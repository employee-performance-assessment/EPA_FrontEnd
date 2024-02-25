import { useSelector } from 'react-redux';
import selectUserModule from '../services/redux/user/selectors';

function TestComponent() {
	const { role, firstName, lastName } = useSelector(selectUserModule);
	return (
		<div>
			<div>Привет, {`${firstName} ${lastName}` || 'user'}!</div>
			{role === 'admin' && <div>Ты админ :)</div>}
		</div>
	);
}

export default TestComponent;
