import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAlbumDetailRequest } from '../../../api/request';

export const getAlbumDetail = createAsyncThunk(
  'album/getAlbumDetail',
  async (id) => {
    const res = await getAlbumDetailRequest(id);
    return res.playlist;
  }
);
