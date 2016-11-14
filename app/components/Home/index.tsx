import * as React from 'react'
import Shortcut from 'components/Shortcut'

export default () => (
  <div>
    <h1>Hello.</h1>
    <p>Welcome to LightCycle.</p>
    <p>Use <Shortcut ctrl letter='H' /> to display Redux Devtools.</p>
    <p>Use <Shortcut ctrl letter='P' /> to change Devtools position.</p>
  </div>
)
