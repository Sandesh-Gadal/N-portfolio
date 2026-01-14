function RoadCurve({ ...props }) {
  return (
    <div
      className={`w-full h-32 border-4 border-gray-700/40 rounded-full
      ${props.direction === 'right'
        ? 'border-l-0 border-b-0 ml-auto'
        : 'border-r-0 border-b-0 mr-auto'}
      `}
    />
  );
}
export { RoadCurve };