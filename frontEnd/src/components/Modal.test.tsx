import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Modal } from './Modal'

describe('Modal', () => {
  it('renders its title and children when open', () => {
    render(
      <Modal open title="New Sandbox" onClose={vi.fn()}>
        <p>Modal body</p>
      </Modal>,
    )

    expect(screen.getByRole('heading', { name: 'New Sandbox' })).toBeInTheDocument()
    expect(screen.getByText('Modal body')).toBeInTheDocument()
  })
})
