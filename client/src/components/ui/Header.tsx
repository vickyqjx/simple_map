import React from 'react';

type HeaderProps = {
  text: string
}

const Header = ({ text }: HeaderProps) => (
  <h1 className="mt-3 mb-4 text-center">{text}</h1>
)

export default Header;
