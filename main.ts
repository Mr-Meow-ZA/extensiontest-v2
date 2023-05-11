namespace encoderExtension {
    let count = 0;
    let lastStatePin1 = 0;
    let lastStatePin2 = 0;

    /**
     * Attach interrupt handlers to monitor encoder pulses
     */
    //% blockId=encoder_attach_interrupts block="attach interrupts to Encoder Signals"
    //% blockGap=8
    export function attachInterrupts(): void {
        pins.setEvents(DigitalPin.P1, PinEventType.Pulse);
        pins.setEvents(DigitalPin.P2, PinEventType.Pulse);
        control.onEvent(DigitalPin.P1, EventBusValue.MICROBIT_PIN_EVT_PULSE_HI, processCounts);
        control.onEvent(DigitalPin.P2, EventBusValue.MICROBIT_PIN_EVT_PULSE_HI, processCounts);
    }

    function processCounts(): void {
        const statePin1 = pins.pulseDuration();
        const statePin2 = pins.pulseDuration();

        if (statePin1 === lastStatePin1 && statePin2 === lastStatePin2) {
            // No pulse detected, ignore
            return;
        }

        if (statePin1 < statePin2) {
            // Forward motion
            count += 1;
        } else {
            // Backward motion
            count -= 1;
        }

        // Update last state
        lastStatePin1 = statePin1;
        lastStatePin2 = statePin2;

        serial.writeLine("Count: " + count);
    }

    /**
     * Get the current count value
     */
    //% blockId=encoder_get_count block="get Encoder Count"
    //% blockGap=8
    export function getCount(): number {
        return count;
    }

    /**
     * Reset the count to zero
     */
    //% blockId=encoder_reset_count block="reset Encoder Count"
    //% blockGap=8
    export function resetCount(): void {
        count = 0;
        lastStatePin1 = 0;
        lastStatePin2 = 0;
    }
}
