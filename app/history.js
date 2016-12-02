import { useRouterHistory } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'

export default useRouterHistory(createHashHistory)({ queryKey: false })
