import React, { ReactNode } from 'react';
import { Popover, Button } from 'antd';

interface PopOverProps {
  title: JSX.Element | ReactNode;
  content: JSX.Element | React.ReactNode;
}

const PopOver: React.FC<PopOverProps> = (props: PopOverProps) => {
  const { title, content } = props;
  return (
    <Popover placement="right" title={title} content={content} trigger="click">
      <Button>Select Filters</Button>
    </Popover>
  );
};

export default PopOver;
