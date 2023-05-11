//% color=#0fbc11 icon="\uf1b9" block="Encoder Extension"

namespace encoderExtension {
    let count = 0;

    /**
     * Attach interrupt handlers to monitor encoder pin changes
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
        count += 1;
        // Serial write the count value whenever a pulse is detected
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
    }
}
