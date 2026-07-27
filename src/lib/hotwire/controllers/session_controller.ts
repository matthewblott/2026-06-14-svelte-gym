import { BridgeComponent } from "@hotwired/hotwire-native-bridge"

export default class extends BridgeComponent {
  static component = "session"

  connect() {
    super.connect()
    const signOut = "signOut"
    this.send(signOut, {}, () => {
      this.element.click()
    })

  }

  disconnect() {
    super.disconnect()
  }
}
