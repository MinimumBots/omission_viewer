#!/bin/bash

CURRENT_PATH=`pwd`
DOCKER_PATH=`which docker`

echo "# Register the BOT to systemd."
echo "----------------------------------------------------------------"
echo "[Unit]
Description=Omission Viewer, a Discord bot.
Requires=docker.service
After=network-online.target

[Service]
WorkingDirectory=$CURRENT_PATH
ExecStart=$DOCKER_PATH start omission_viewer_worker -a
ExecStop=$DOCKER_PATH stop omission_viewer_worker

[Install]
WantedBy=network-online.target
" | sudo tee /etc/systemd/system/omission_viewer.service
echo "----------------------------------------------------------------"

echo "# Enable the service."
echo "----------------------------------------------------------------"
sudo systemctl daemon-reload
sudo systemctl enable systemd-networkd
sudo systemctl enable systemd-networkd-wait-online
sudo systemctl enable omission_viewer
echo "----------------------------------------------------------------"

################################################################################

SHUTDOWN_PATH=`which shutdown`

echo "# Register weekly reboots service to systemd."
echo "----------------------------------------------------------------"
echo "[Unit]
Description=Reboot the system.
RefuseManualStart=no
RefuseManualStop=yes

[Service]
Type=oneshot
ExecStart=/usr/bin/systemctl --force reboot
" | sudo tee /etc/systemd/system/weekly_reboots.service
echo "----------------------------------------------------------------"

echo "# Register weekly reboots timer to systemd."
echo "----------------------------------------------------------------"
echo "[Unit]
Description=Reboot the system every Thuesday at 19:00(UTC).

[Timer]
OnCalendar=Wednesday 19:00:00

[Install]
WantedBy=timers.target
" | sudo tee /etc/systemd/system/weekly_reboots.timer
echo "----------------------------------------------------------------"

echo "# Enable weekly reboots."
echo "----------------------------------------------------------------"
sudo systemctl daemon-reload
sudo systemctl enable weekly_reboots.timer
echo "----------------------------------------------------------------"

