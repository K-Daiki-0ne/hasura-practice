/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages';
import 'setimmediate'

it('Should render title text', () => {
  render(<Home />)
  expect(screen.getByText('NextJS + GraphQL with Hasura(Cloud)')).toBeInTheDocument()
})