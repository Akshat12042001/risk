import React, {useCallback, useMemo, useState} from 'react';
import {Pressable, StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Icon, StyledText} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import styles from './styles';

const TABS = {
  UPCOMING: 'upcoming',
  PREVIOUS: 'previous',
};

const BookingsScreen = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(TABS.UPCOMING);

  const bookings = useMemo(() => [], []);

  const handleHelp = useCallback(() => {
    // Help flow will be wired later
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />

      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <StyledText color={COLORS.BLACK} size={28} textStyle={styles.title}>
          {t('BOOKINGS_SCREEN.TITLE')}
        </StyledText>

        <Pressable style={styles.helpButton} onPress={handleHelp} hitSlop={8}>
          <Icon name="support-agent" size={18} color={COLORS.BLACK} />
          <StyledText
            color={COLORS.BLACK}
            size={14}
            textStyle={styles.helpLabel}>
            {t('BOOKINGS_SCREEN.HELP')}
          </StyledText>
        </Pressable>
      </View>

      <View style={styles.divider} />

      <View style={styles.segmentWrap}>
        <View style={styles.segment}>
          <Pressable
            style={[
              styles.segmentItem,
              activeTab === TABS.UPCOMING && styles.segmentItemActive,
            ]}
            onPress={() => setActiveTab(TABS.UPCOMING)}>
            <StyledText
              color={
                activeTab === TABS.UPCOMING ? COLORS.WHITE : COLORS.BLACK
              }
              size={15}
              textStyle={styles.segmentLabel}>
              {t('BOOKINGS_SCREEN.UPCOMING')}
            </StyledText>
          </Pressable>

          <Pressable
            style={[
              styles.segmentItem,
              activeTab === TABS.PREVIOUS && styles.segmentItemActive,
            ]}
            onPress={() => setActiveTab(TABS.PREVIOUS)}>
            <StyledText
              color={
                activeTab === TABS.PREVIOUS ? COLORS.WHITE : COLORS.BLACK
              }
              size={15}
              textStyle={styles.segmentLabel}>
              {t('BOOKINGS_SCREEN.PREVIOUS')}
            </StyledText>
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        {bookings.length === 0 ? (
          <>
            <View style={styles.emptyIllustration}>
              <View style={styles.calendarBinders}>
                <View style={styles.binder} />
                <View style={styles.binder} />
                <View style={styles.binder} />
              </View>
              <View style={styles.calendarBody}>
                <View style={styles.calendarPage}>
                  <View style={styles.calendarGrid}>
                    {Array.from({length: 12}).map((_, index) => (
                      <View key={`dot-${index}`} style={styles.calendarDot} />
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.checkBadge}>
                <Icon name="check" size={16} color={COLORS.BLACK} />
              </View>
            </View>

            <StyledText
              color={COLORS.GRAY_LIGHT}
              size={16}
              textAlign="center"
              textStyle={styles.emptyText}>
              {t('BOOKINGS_SCREEN.EMPTY')}
            </StyledText>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default BookingsScreen;
