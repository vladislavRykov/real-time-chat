import React, { useEffect, useState } from 'react';
import s from './UserList.module.scss';
import { useAppDispatch } from '../../../../../hooks/reduxHooks';
import { getAllUsers } from '../../../../../redux/Slices/usersSlice';
import { addNewMessage, createDialog } from '../../../../../redux/Slices/dialogSlice';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';

interface UserListProps {
  users:
    | {
        _id: string;
        fullName: string;
      }[]
    | null;
  isListShow: boolean;
}

export const UserList: React.FC<UserListProps> = ({ users, isListShow }) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<{ id: string; label: string } | null>(null);
  useEffect(() => {
    if (isListShow) {
      dispatch(getAllUsers());
    }
  }, [isListShow]);
  const options = users?.map((user) => {
    return { id: user._id, label: user.fullName };
  });
  const onUserClick = async (id: string) => {
    await dispatch(createDialog(id));
  };
  return (
    <div className={s.list}>
      {options && (
        <>
          <Autocomplete
            onChange={(e, value) => {
              setSearchValue(value);
            }}
            options={options}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
          {searchValue && (
            <button onClick={() => onUserClick(searchValue.id)}>Создать диалог</button>
          )}
        </>
      )}
    </div>
  );
};
