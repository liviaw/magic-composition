import React, {useState} from 'react';

interface Person {
  firstName: string;
}

interface Props {
  text: string;
  ok?: boolean;
  i?: number;
  fn?:(bob: string) => string;
  person: Person;
}

interface TextNode {
  text: string
}


export const Import: React.FC<Props> = ({}) => {
// function Import() {
  const [count, setCount] = useState<TextNode>({text: 'ughh'});
  return (
    <div>
      quiz!
      <form action="/action_page.php">
        <input type="file"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
