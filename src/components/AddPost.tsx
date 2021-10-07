import React from 'react';

const AddPost = () => {
  const onSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    console.log();
  };

  return (
    <form>
      <input type="text" name="title" />
      <textarea name="body" />

      <button onSubmit={onSubmit}>Submit</button>
    </form>
  );
};
