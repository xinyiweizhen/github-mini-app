// eslint-disable-next-line import/prefer-default-export
// 同步 action creator
export function createSyncAction(actionType) {
    return (payload) => ({
        type: actionType,
        payload
      })
  }

// 异步 action creator
export function createAsyncAction(actionType, func = () => {}) {
return (
    params = {},
    callback = { success: () => {}, fail: () => {} },
    customActionType = actionType,
) => async (dispatch) => {
    try {
        dispatch({ type: `${customActionType}_request`, params });
        // 返回promise
        const data = await func(params);
        dispatch({ type: customActionType, params, payload: data });
        callback.success && callback.success({ payload: data })
        // 返回promise
        return data
    } catch (e) {
        dispatch({ type: `${customActionType}_failure`, params, payload: e })
        callback.fail && callback.fail({ payload: e })
    }
}
}