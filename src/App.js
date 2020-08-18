
import {createElement} from 'react';
import {atom, selectorFamily, useRecoilValue, useSetRecoilState} from 'recoil';

const ce = createElement;

/*
RECOIL
*/
const names = ['a', 'b', 'c'];  // fixed names for each row for our app
const appAtom = atom({
  key: 'app',
  default: {a: ['init'], b: ['hello'], c: ['world']}
});  // same keys as `names` above
const appSubkeySelector = selectorFamily(
    {key: 'appSubkey', get: key => ({get}) => get(appAtom)[key]});

/*
REACT
*/
function App() {
  return ce('div', null, ...names.map(name => ce(Row, {name})), ce(AddButton));
}

function Row({name}) {
  const elements = useRecoilValue(appSubkeySelector(name));
  console.log('RERENDERING ' + name);
  return ce('ol', null, ...elements.map(element => ce('li', null, element)));
}

function AddButton() {
  const setState = useSetRecoilState(appAtom);
  return ce(
      'button', {
        onClick: () => {
          const randomIdx = Math.floor(Math.random() * names.length);
          const randomName = names[randomIdx];
          const newElement = (new Date()).toISOString()
          setState(
              old =>
                  ({...old, [randomName]: old[randomName].concat(newElement)}))
        }
      },
      'Add')
}

export default App;
