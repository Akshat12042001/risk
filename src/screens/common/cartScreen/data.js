export const SLOTS_INFO =
  'Slots may vary based on partner availability and the selected service.';

export const PERIOD_ICONS = {
  morning: 'wb-sunny',
  afternoon: 'wb-twilight',
  evening: 'nights-stay',
};

export const formatSlotDisplayDate = dateKey => {
  if (!dateKey) {
    return '';
  }

  const [year, month, day] = dateKey.split('-').map(Number);
  if (!year || !month || !day) {
    return dateKey;
  }

  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatSlotSummaryTime = label =>
  String(label || '')
    .replace(/\s+/g, '')
    .replace(/am/i, 'AM')
    .replace(/pm/i, 'PM');
