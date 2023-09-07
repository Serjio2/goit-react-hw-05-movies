import { FallingLines } from  'react-loader-spinner'

export const Loader = () => {
return (
<FallingLines
  color="#63501d"
  width="100"
  visible={true}
  ariaLabel='falling-lines-loading'
/>
)
}