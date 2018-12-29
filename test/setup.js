const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { createSerializer } = require('enzyme-to-json');
require('jest-enzyme');

enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
