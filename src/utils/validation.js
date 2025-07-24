export const validateScriptStructure = (script) => {
  const errors = [];

  if (!script || typeof script !== "object") {
    errors.push("اسکریپت باید یک آبجکت معتبر باشد");
    return { isValid: false, errors };
  }

  if (!script.scriptInfo) {
    errors.push("اطلاعات اسکریپت (scriptInfo) موجود نیست");
  } else {
    if (!script.scriptInfo.title) {
      errors.push("عنوان اسکریپت الزامی است");
    }
    if (!script.scriptInfo.description) {
      errors.push("توضیحات اسکریپت الزامی است");
    }
  }

  if (!script.sections || !Array.isArray(script.sections)) {
    errors.push("بخش‌های اسکریپت باید یک آرایه معتبر باشد");
  } else {
    if (script.sections.length === 0) {
      errors.push("اسکریپت باید حداقل یک بخش داشته باشد");
    }

    script.sections.forEach((section, index) => {
      if (!section.id) {
        errors.push(`بخش ${index + 1}: شناسه (id) الزامی است`);
      }
      if (!section.title) {
        errors.push(`بخش ${index + 1}: عنوان الزامی است`);
      }
      if (!section.text) {
        errors.push(`بخش ${index + 1}: متن الزامی است`);
      }
      if (!section.keywords || !Array.isArray(section.keywords)) {
        errors.push(`بخش ${index + 1}: کلمات کلیدی باید یک آرایه باشد`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateSettings = (settings) => {
  const errors = [];

  if (
    settings.autoAdvanceThreshold < 50 ||
    settings.autoAdvanceThreshold > 95
  ) {
    errors.push("آستانه پیشرفت خودکار باید بین 50 تا 95 درصد باشد");
  }

  if (settings.speakingRate < 0.1 || settings.speakingRate > 2.0) {
    errors.push("سرعت پخش باید بین 0.1 تا 2.0 باشد");
  }

  if (
    settings.confidenceThreshold < 0.1 ||
    settings.confidenceThreshold > 1.0
  ) {
    errors.push("آستانه اعتماد باید بین 0.1 تا 1.0 باشد");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
