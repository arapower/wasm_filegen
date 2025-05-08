use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct FileGenerator {
    record_size: usize,
    total_records: usize,
    current_record: usize,
}

#[wasm_bindgen]
impl FileGenerator {
    #[wasm_bindgen(constructor)]
    pub fn new(total_records: usize, record_size: usize) -> Self {
        Self { record_size, total_records, current_record: 0 }
    }

    #[wasm_bindgen]
    pub fn generate_chunk(&mut self, buffer: &mut [u8]) -> usize {
        let records_per_chunk = buffer.len() / self.record_size;
        let records_to_write = std::cmp::min(records_per_chunk, self.total_records - self.current_record);

        for i in 0..records_to_write {
            let offset = i * self.record_size;
            buffer[offset..offset + self.record_size].fill(0xAA);
        }
        self.current_record += records_to_write;
        records_to_write * self.record_size
    }

    #[wasm_bindgen]
    pub fn is_finished(&self) -> bool {
        self.current_record >= self.total_records
    }
}
