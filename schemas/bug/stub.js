module.exports = {
  instance: {
    code: `
import React from 'react';

class Buggy extends React.Component {
  handler(event){
    console.log(event);
  }

  render(){
    return (
      <button onClick={this.handler}>Click me... I should make a log</button>
    );
  }
};`,
    tags: ['reactjs', 'undefined is not a function'],
    test: [['click', 'button'], ['expect', 'console.log']],
    id: 0,
  },
};
