import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon, StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import {makeGetSlotsRequest} from '../../../../api/slots';
import {
  PERIOD_ICONS,
  formatSlotDisplayDate,
  formatSlotSummaryTime,
} from '../data';
import styles from '../styles';

const ScheduleSlotModal = ({
  visible,
  initialSelection,
  onClose,
  onConfirm,
}) => {
  const insets = useSafeAreaInsets();
  const [days, setDays] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [slots, setSlots] = useState([]);
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    initialSelection?.dateId || null,
  );
  const [selectedPeriod, setSelectedPeriod] = useState(
    initialSelection?.periodId || 'afternoon',
  );
  const [selectedSlotId, setSelectedSlotId] = useState(
    initialSelection?.slotId || null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const loadSlots = useCallback(async ({date, period}) => {
    setIsLoading(true);
    try {
      const params = {};
      if (date) {
        params.date = date;
      }
      if (period) {
        params.period = period;
      }

      const response = await makeGetSlotsRequest(params);
      const payload = response?.data || {};
      const nextDays = Array.isArray(payload.days) ? payload.days : [];
      const nextPeriods = Array.isArray(payload.periods) ? payload.periods : [];
      const nextSlots = Array.isArray(payload.slots) ? payload.slots : [];

      setDays(nextDays);
      setPeriods(nextPeriods);
      setSlots(nextSlots);
      setNote(payload.note || '');

      setSelectedDate(prev => {
        if (date && nextDays.some(day => day.date === date || day.id === date)) {
          return date;
        }
        if (prev && nextDays.some(day => day.date === prev || day.id === prev)) {
          return prev;
        }
        return (
          payload.selectedDate ||
          nextDays[1]?.date ||
          nextDays[1]?.id ||
          nextDays[0]?.date ||
          nextDays[0]?.id ||
          null
        );
      });

      setSelectedPeriod(prev => {
        if (period && nextPeriods.some(item => item.id === period)) {
          return period;
        }
        if (prev && nextPeriods.some(item => item.id === prev)) {
          return prev;
        }
        return nextPeriods.find(item => item.id === 'afternoon')?.id ||
          nextPeriods[0]?.id ||
          'afternoon';
      });
    } catch (error) {
      setDays([]);
      setPeriods([]);
      setSlots([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setSelectedSlotId(initialSelection?.slotId || null);
    loadSlots({
      date: initialSelection?.dateId || undefined,
      period: initialSelection?.periodId || 'afternoon',
    });
  }, [initialSelection, loadSlots, visible]);

  const selectedDay = useMemo(
    () => days.find(day => day.date === selectedDate || day.id === selectedDate),
    [days, selectedDate],
  );

  const selectedSlot = useMemo(
    () => slots.find(slot => slot.id === selectedSlotId),
    [selectedSlotId, slots],
  );

  const availableSlots = useMemo(
    () => slots.filter(slot => slot.isAvailable !== false),
    [slots],
  );

  const canConfirm = Boolean(
    selectedDay && selectedSlot && selectedSlot.isAvailable !== false,
  );

  const handleSelectDate = useCallback(
    day => {
      const nextDate = day.date || day.id;
      setSelectedDate(nextDate);
      setSelectedSlotId(null);
      loadSlots({date: nextDate, period: selectedPeriod});
    },
    [loadSlots, selectedPeriod],
  );

  const handleSelectPeriod = useCallback(
    periodId => {
      setSelectedPeriod(periodId);
      setSelectedSlotId(null);
      if (selectedDate) {
        loadSlots({date: selectedDate, period: periodId});
      }
    },
    [loadSlots, selectedDate],
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable style={styles.modalDismissArea} onPress={onClose} />
        <View
          style={[
            styles.modalSheet,
            {paddingBottom: Math.max(insets.bottom, 16)},
          ]}>
          <View style={styles.grabber} />
          <StyledText
            color={COLORS.BLACK}
            size={20}
            textStyle={styles.modalTitle}>
            Schedule for later
          </StyledText>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}>
            {days.map(day => {
              const dayKey = day.date || day.id;
              const selected = dayKey === selectedDate;
              return (
                <Pressable
                  key={dayKey}
                  style={[
                    styles.dateChip,
                    selected && styles.dateChipSelected,
                  ]}
                  onPress={() => handleSelectDate(day)}>
                  <StyledText
                    color={COLORS.BLACK}
                    size={14}
                    textStyle={
                      selected
                        ? styles.dateChipTextSelected
                        : styles.dateChipText
                    }>
                    {day.label}
                  </StyledText>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.slotCard}>
            <StyledText
              color={COLORS.GRAY}
              size={13}
              textStyle={styles.slotLabel}>
              Service start time
            </StyledText>

            <View style={styles.periodRow}>
              {periods.map(period => {
                const selected = period.id === selectedPeriod;
                return (
                  <Pressable
                    key={period.id}
                    style={[
                      styles.periodChip,
                      selected && styles.periodChipSelected,
                    ]}
                    onPress={() => handleSelectPeriod(period.id)}>
                    <Icon
                      name={PERIOD_ICONS[period.id] || 'schedule'}
                      size={16}
                      color={selected ? COLORS.WHITE : COLORS.GRAY}
                    />
                    <StyledText
                      color={selected ? COLORS.WHITE : COLORS.GRAY}
                      size={12}
                      textStyle={styles.periodLabel}>
                      {period.label}
                    </StyledText>
                  </Pressable>
                );
              })}
            </View>

            {isLoading ? (
              <View style={styles.soldOutWrap}>
                <ActivityIndicator color={COLORS.PRIMARY} />
              </View>
            ) : availableSlots.length ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.slotList}>
                {slots.map(slot => {
                  const selected = slot.id === selectedSlotId;
                  const unavailable = slot.isAvailable === false;
                  const surchargeText =
                    slot.surchargeLabel ||
                    (slot.surcharge > 0 ? `+₹${slot.surcharge}` : null);
                  return (
                    <Pressable
                      key={slot.id}
                      disabled={unavailable}
                      style={[
                        styles.slotChip,
                        !!surchargeText && styles.slotChipWithSurcharge,
                        selected && styles.slotChipSelected,
                        unavailable && styles.slotChipDisabled,
                      ]}
                      onPress={() => setSelectedSlotId(slot.id)}>
                      <StyledText
                        color={unavailable ? COLORS.GRAY_LIGHT : COLORS.BLACK}
                        size={13}
                        textStyle={styles.slotTime}>
                        {slot.label}
                      </StyledText>
                      {surchargeText ? (
                        <View style={styles.slotSurchargeBadge}>
                          <StyledText
                            color={unavailable ? COLORS.GRAY_LIGHT : '#D97706'}
                            size={11}
                            textStyle={[
                              styles.slotSurcharge,
                              selected && styles.slotSurchargeSelected,
                            ]}>
                            {surchargeText}
                          </StyledText>
                        </View>
                      ) : null}
                    </Pressable>
                  );
                })}
              </ScrollView>
            ) : (
              <View style={styles.soldOutWrap}>
                <View style={styles.soldOutIcon}>
                  <Icon name="block" size={30} color="#F87171" />
                </View>
                <StyledText
                  color={COLORS.GRAY}
                  size={12}
                  textStyle={styles.soldOutTitle}>
                  FULLY BOOKED
                </StyledText>
                <StyledText
                  color={COLORS.BLACK}
                  size={13}
                  textStyle={styles.soldOutText}>
                  More slots open between 7-11 AM on the same day. Instant slots
                  become available throughout the day.
                </StyledText>
              </View>
            )}
          </View>

          {note ? (
            <StyledText
              color={COLORS.GRAY}
              size={12}
              textStyle={styles.noteText}>
              NOTE: {note}
            </StyledText>
          ) : null}

          <Pressable
            style={[
              styles.confirmButton,
              !canConfirm && styles.confirmButtonDisabled,
            ]}
            disabled={!canConfirm}
            onPress={() => {
              if (!canConfirm) {
                return;
              }
              const dateKey = selectedDay.date || selectedDay.id;
              const displayDate = formatSlotDisplayDate(dateKey);
              onConfirm?.({
                dateId: dateKey,
                dateLabel: selectedDay.label,
                displayDate,
                periodId: selectedPeriod,
                slotId: selectedSlot.id,
                timeLabel: selectedSlot.label,
                surcharge: selectedSlot.surcharge || 0,
                summary: `${displayDate} - ${formatSlotSummaryTime(
                  selectedSlot.label,
                )}`,
              });
            }}>
            <StyledText
              color={COLORS.WHITE}
              size={16}
              textStyle={styles.confirmButtonText}>
              Confirm time
            </StyledText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(ScheduleSlotModal);
