import init, { FileGenerator } from "./pkg/wasm_filegen.js";
const RECORD_SIZE = 100;
const TOTAL_RECORDS = 10000000;
const CHUNK_SIZE = 1024 * 1024;

document.getElementById('save-btn').onclick = async () => {
  // If the file save API is not supported in this browser
  if (!('showSaveFilePicker' in window)) {
    alert('This browser does not support the file save API. Please use the latest version of Chrome or Edge.');
    return;
  }
  await init();
  const generator = new FileGenerator(TOTAL_RECORDS, RECORD_SIZE);

  try {
    // Open the file save dialog
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: 'large_file.bin',
      types: [{ description: 'Binary', accept: { 'application/octet-stream': ['.bin'] } }]
    });
    const writable = await fileHandle.createWritable();
    const buffer = new Uint8Array(CHUNK_SIZE);

    // Generate and write data in chunks
    while (!generator.is_finished()) {
      const written = generator.generate_chunk(buffer);
      await writable.write(buffer.subarray(0, written));
      buffer.fill(0);
    }
    await writable.close();
    alert('Saving is complete');
  } catch (e) {
    alert('File saving was canceled.');
  }
};
