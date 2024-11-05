const  processData = (scannedData, designedData) =>{
    const result = {};
    
    scannedData.forEach(item => {
      const { DATE, LS3, ZEISS, SHAPE, COPY_MILL, FULL_ARCH } = item;
      
      if (!result[DATE]) {
        result[DATE] = {
          _id: DATE,
          LS3: 0,
          ZEISS: 0,
          SHAPE: 0,
          COPY_MILL: 0,
          FULL_ARCH: 0,
          IBO_DESIGNED: 0,
          CROWN_REST: 0,
          CEMENTE_BRIDGE_REST: 0,
          FULL_ARCH_P: 0,
          FULL_ARCH_F: 0,
          IMPLANT_REST: 0,
          IMPLANT_BRIDGE_REST: 0,
          PRINTED_MODELS: 0
        };
      }
      
      result[DATE].LS3 += LS3;
      result[DATE].ZEISS += ZEISS;
      result[DATE].SHAPE += SHAPE;
      result[DATE].COPY_MILL += COPY_MILL;
      result[DATE].FULL_ARCH += FULL_ARCH;
    });
    
    designedData.forEach(item => {
      const { DATE, IBO_DESIGNED, CROWN_REST, CEMENTE_BRIDGE_REST, FULL_ARCH_P, FULL_ARCH_F, IMPLANT_REST, IMPLANT_BRIDGE_REST, PRINTED_MODELS } = item;
      
      if (!result[DATE]) {
        result[DATE] = {
          _id: DATE,
          LS3: 0,
          ZEISS: 0,
          SHAPE: 0,
          COPY_MILL: 0,
          FULL_ARCH: 0,
          IBO_DESIGNED: 0,
          CROWN_REST: 0,
          CEMENTE_BRIDGE_REST: 0,
          FULL_ARCH_P: 0,
          FULL_ARCH_F: 0,
          IMPLANT_REST: 0,
          IMPLANT_BRIDGE_REST: 0,
          PRINTED_MODELS: 0
        };
      }
      
      result[DATE].IBO_DESIGNED += IBO_DESIGNED;
      result[DATE].CROWN_REST += CROWN_REST;
      result[DATE].CEMENTE_BRIDGE_REST += CEMENTE_BRIDGE_REST;
      result[DATE].FULL_ARCH_P += FULL_ARCH_P;
      result[DATE].FULL_ARCH_F += FULL_ARCH_F;
      result[DATE].IMPLANT_REST += IMPLANT_REST;
      result[DATE].IMPLANT_BRIDGE_REST += IMPLANT_BRIDGE_REST;
      result[DATE].PRINTED_MODELS += PRINTED_MODELS;
    });
    
    return Object.values(result);
  }

  export default processData