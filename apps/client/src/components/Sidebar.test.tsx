import { render, screen, waitFor } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { useQuery } from '@tanstack/react-query';
import '@testing-library/jest-dom'


jest.mock('@repo/schemas', () => ({
    BaseResponseGeneric: jest.fn(),
    CollectionDtoResponse: jest.fn(),
    GenreDtoResponse: jest.fn()
}));

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn()
}));


test('renders collections correctly', async () => {
    // Mock de useQuery para colecciones
    (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
        if (queryKey[0] === 'collections') {
            return {
                data: {
                    status: 'success',
                    data: [
                        { id: 1, name: 'Collection 1' },
                        { id: 2, name: 'Collection 2' }
                    ]
                },
                isLoading: false,
                isError: false
            };
        }
        return { isLoading: true, isError: false };  // Default para otras llamadas
    });

    render(<Sidebar />);

    await waitFor(() => {
        expect(screen.getByText('Collection 1')).toBeInTheDocument();
        expect(screen.getByText('Collection 2')).toBeInTheDocument();
    });
});

test('renders genres correctly', async () => {
    // Mock de useQuery para géneros
    (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
        if (queryKey[0] === 'genres') {
            return {
                data: {
                    status: 'success',
                    data: [
                        { id: 1, name: 'Genre 1' },
                        { id: 2, name: 'Genre 2' }
                    ]
                },
                isLoading: false,
                isError: false
            };
        }
        return { isLoading: true, isError: false };  // Default para otras llamadas
    });

    render(<Sidebar />);

    // await waitFor(() => {
        expect(screen.getByText('Genre 1')).toBeInTheDocument();
        expect(screen.getByText('Genre 2')).toBeInTheDocument();
    // });
});