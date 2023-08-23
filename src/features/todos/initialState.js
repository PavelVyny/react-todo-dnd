const initialState = {
  urgency: {
    high: [],
    medium: [],
    low: [],
  },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export default initialState;
