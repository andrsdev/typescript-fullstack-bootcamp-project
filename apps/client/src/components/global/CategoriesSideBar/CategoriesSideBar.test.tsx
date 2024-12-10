import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CategoriesSidebar from './CategoriesSideBar'

describe('CategoriesSidebar Component', () => {
  const mockOnCategoryChange = jest.fn()

  const categories = ['Category 1', 'Category 2', 'Category 3']
  const selectedCategory = 'Category 1'

  beforeEach(() => {
    render(
      <CategoriesSidebar
        name="Categories"
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={mockOnCategoryChange}
      />,
    )
  })

  it('renders the sidebar with a title and categories', () => {
    const title = screen.getByText(/categories/i)
    const categoryItems = screen.getAllByRole('listitem')

    expect(title).toBeInTheDocument()
    expect(categoryItems).toHaveLength(categories.length)
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  it('renders the selected category with an underline', () => {
    const selectedCategoryElement = screen.getByText(selectedCategory)
    expect(selectedCategoryElement).toHaveClass('underline')
  })

  it('calls onCategoryChange when a category is clicked', () => {
    const categoryToClick = 'Category 2'
    const categoryElement = screen.getByText(categoryToClick)

    fireEvent.click(categoryElement)

    expect(mockOnCategoryChange).toHaveBeenCalledTimes(1)
    expect(mockOnCategoryChange).toHaveBeenCalledWith(categoryToClick)
  })
})
