import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ScreenPetSelection from './page';
import { useTracking } from '@/hooks';
import { HeaderAcquisitionFlow, ProgressBar } from '@/components';
import { FormPetSelection } from '@/components/FormPetSelection';
import React from 'react';

// Type definitions for mocks to avoid TypeScript errors
type MockProps = Record<string, unknown>;
type MockCall = [props: MockProps, context?: unknown];
type MockCalls = MockCall[];

// Mock the necessary dependencies
jest.mock('@/hooks', () => ({
	useTracking: jest.fn(),
}));

// Create spy implementations for components
const mockHeaderComponent = jest.fn(() => (
	<div data-testid="header-acquisition-flow" />
));
const mockProgressBarComponent = jest.fn(() => (
	<div data-testid="progress-bar" />
));
const mockFormPetSelectionComponent = jest.fn(() => (
	<div data-testid="form-pet-selection" />
));

// Helper function to safely get props from mock calls
const getProps = (mockFn: jest.Mock, callIndex = 0): MockProps => {
	if (mockFn.mock.calls.length <= callIndex) return {};
	return mockFn.mock.calls[callIndex][0] || {};
};

jest.mock('@/components', () => ({
	HeaderAcquisitionFlow: mockHeaderComponent,
	ProgressBar: mockProgressBarComponent,
}));

jest.mock('@/components/FormPetSelection', () => ({
	FormPetSelection: mockFormPetSelectionComponent,
}));

describe('ScreenPetSelection', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	it('should render correctly', () => {
		const { container, rerender } = render(<ScreenPetSelection />);

		expect(useTracking).toHaveBeenCalledTimes(1);

		expect(screen.getByTestId('header-acquisition-flow')).toBeInTheDocument();
		expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
		expect(screen.getByTestId('form-pet-selection')).toBeInTheDocument();

		expect(container.firstChild?.childNodes.length).toBe(3);

		rerender(<ScreenPetSelection />);
		expect(container.firstChild?.childNodes.length).toBe(3);
		expect(useTracking).toHaveBeenCalledTimes(2);
	});

	it('should render HeaderAcquisitionFlow with correct props', () => {
		render(<ScreenPetSelection />);

		expect(mockHeaderComponent).toHaveBeenCalledTimes(1);
		expect(mockHeaderComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				goBackLink: '/',
				hasShoppingCart: false,
			}),
			expect.anything(),
		);

		const headerProps = getProps(mockHeaderComponent);
		expect(Object.keys(headerProps).length).toBe(2);
		expect(headerProps).toEqual({
			goBackLink: '/',
			hasShoppingCart: false,
		});
	});

	it('should render ProgressBar with correct props', () => {
		render(<ScreenPetSelection />);

		expect(mockProgressBarComponent).toHaveBeenCalledTimes(1);
		expect(mockProgressBarComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				initialValue: 0,
				value: 20,
			}),
			expect.anything(),
		);

		const progressProps = getProps(mockProgressBarComponent);
		expect(Object.keys(progressProps).length).toBe(2);
		expect(progressProps).toEqual({
			initialValue: 0,
			value: 20,
		});
	});

	it('should render FormPetSelection component', () => {
		render(<ScreenPetSelection />);

		expect(mockFormPetSelectionComponent).toHaveBeenCalledTimes(1);
		expect(mockFormPetSelectionComponent).toHaveBeenCalledWith(
			expect.any(Object),
			expect.anything(),
		);

		const formProps = getProps(mockFormPetSelectionComponent);
		expect(Object.keys(formProps).length).toBe(0);
	});

	it('should call useTracking hook on component mount', () => {
		render(<ScreenPetSelection />);
		expect(useTracking).toHaveBeenCalledTimes(1);
		expect(useTracking).toHaveBeenCalledWith();
	});

	it('should maintain component structure with correct order of elements', () => {
		const { container } = render(<ScreenPetSelection />);

		const childNodes = Array.from(container.firstChild?.childNodes || []);
		expect(childNodes.length).toBe(3);

		const headerElement = screen.getByTestId('header-acquisition-flow');
		const progressElement = screen.getByTestId('progress-bar');
		const formElement = screen.getByTestId('form-pet-selection');

		if (childNodes.length >= 3) {
			expect(childNodes[0]).toEqual(headerElement);
			expect(childNodes[1]).toEqual(progressElement);
			expect(childNodes[2]).toEqual(formElement);
		}

		const allElements = screen.getAllByTestId(/header|progress|form/);
		expect(allElements.length).toBe(3);
	});

	it('should not pass any props to FormPetSelection', () => {
		render(<ScreenPetSelection />);

		const props = getProps(mockFormPetSelectionComponent);
		expect(props).toEqual({});
	});

	it('should render the same components when re-rendered', () => {
		const { rerender } = render(<ScreenPetSelection />);

		const firstRenderCalls = {
			header: mockHeaderComponent.mock.calls.length,
			progressBar: mockProgressBarComponent.mock.calls.length,
			formPetSelection: mockFormPetSelectionComponent.mock.calls.length,
		};

		rerender(<ScreenPetSelection />);

		expect(mockHeaderComponent.mock.calls.length).toBe(
			firstRenderCalls.header + 1,
		);
		expect(mockProgressBarComponent.mock.calls.length).toBe(
			firstRenderCalls.progressBar + 1,
		);
		expect(mockFormPetSelectionComponent.mock.calls.length).toBe(
			firstRenderCalls.formPetSelection + 1,
		);
	});

	it('should have consistent props across renders', () => {
		const { rerender } = render(<ScreenPetSelection />);

		const firstHeaderProps = getProps(mockHeaderComponent, 0);
		const firstProgressProps = getProps(mockProgressBarComponent, 0);

		rerender(<ScreenPetSelection />);

		const secondHeaderProps = getProps(mockHeaderComponent, 1);
		const secondProgressProps = getProps(mockProgressBarComponent, 1);

		expect(secondHeaderProps).toEqual(firstHeaderProps);
		expect(secondProgressProps).toEqual(firstProgressProps);
	});

	it('should handle snapshot comparison', () => {
		const { container } = render(<ScreenPetSelection />);
		expect(container).toMatchSnapshot();
	});
});
