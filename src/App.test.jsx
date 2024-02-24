import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
test('renders learn react link', () => {
	console.log('test app')
	render(<App />);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
