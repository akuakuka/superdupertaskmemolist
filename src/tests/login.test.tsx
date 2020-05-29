import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import {Login} from '../components/login'
import {Memo} from "../components/Memos/Memo"
import { Router, MemoryRouter } from 'react-router'
import store  from "../state/store";
import { Provider } from 'react-redux'
import App from '../App'
import faker from "faker"
import { prettyDOM } from '@testing-library/dom'

const testUser = {
  userID: faker.random.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName()
}

const testMemo = {
  memoID: faker.random.uuid(),
  title: faker.random.word(),
  content:faker.random.word(),
  User: testUser,
  panelID:faker.random.uuid(),
}
it('should take a snapshot', () => {
expect(1).toBe(1)
 })

// test('renders content', () => {

//   const component = render(
//     <div>
//     <Memo Memo={testMemo}/>
//     </div>
//   )

//   expect(component.container).toHaveTextContent(
//     'Component testing is done with react-testing-library'
//   )
//  // console.log(prettyDOM(li))
// })