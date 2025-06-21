import {
  TruckIcon,
  CheckCircleIcon,
  ArchiveBoxIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/apiClient";
import userLogo from "../assets/logo user.png";
import TyreDetailModal from "../components/Popup";
import SummaryCard from "../components/SummaryCard";
import UnitTable from "../components/UnitTable";
import TyreTable from "../components/TyreTable";
import TyreTableAction from "../components/TyreTableAction";
import UnitDetailModal from "../components/PopupUnit";
import ExportModal from "../components/ExportModal";
import { toast } from "react-toastify";

const Home = () => {
  const [summary, setSummary] = useState({
    totalUnit: 0,
    totalTyre: 0,
    installedTyre: 0,
    removedTyre: 0,
    scrapTyre: 0,
    userTotal: 0,
  });
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTyre, setSelectedTyre] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);
  const [siteList, setSiteList] = useState([]);
  const [tyres, setTyres] = useState([]);
  const [units, setUnits] = useState([]);
  const [currentPageTyre, setCurrentPageTyre] = useState(1);
  const [currentPageUnit, setCurrentPageUnit] = useState(1);
  const [currentPageTyreInstall, setCurrentPageTyreInstall] = useState(1);
  const [currentPageTyreRemove, setCurrentPageTyreRemove] = useState(1);
  const [currentPageTyreScrap, setCurrentPageTyreScrap] = useState(1);
  const [roleId, setRoleId] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedSite, setSelectedSite] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // const storedUsername = sessionStorage.getItem("username");
    const storedRoleId = sessionStorage.getItem("roleId");
    // if (storedUsername) setUsername(storedUsername);
    if (storedRoleId) setRoleId(parseInt(storedRoleId));
  }, []);
  const itemsPerPage = 10; // Jumlah data per halaman
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const username = capitalizeFirst(user?.name);

  const fetchUnitDetails = async (unitId) => {
    try {
      const data = await apiFetch(`/unit/${unitId}`);

      setSelectedUnit(data.data); // sesuai struktur respons API Anda
      setIsUnitModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch unit details:", error);
    }
  };

  const handleExportSubmit = async () => {
    if (!selectedSite) {
      toast.error("Mohon isi semua field yang wajib.");
      return;
    }

    const data = {
      roleId: parseInt(user.roleId),
      siteId: parseInt(selectedSite),
      startDate: startDate,
      endDate: endDate,
    };

    try {
      console.log(data);
      // const result = await apiFetch("/export", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      // });
      const result = await fetch(
        `https://d91f-103-24-58-37.ngrok-free.app/export`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "halodek",
          },
          body: JSON.stringify(data),
        }
      );
      if (!result.ok) {
        throw new Error("Gagal export data");
      }
      // 🟢 Tangani sebagai file (Blob)
      const blob = await result.blob();

      // 🟢 Buat link download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      //
      // a.download = "export-data.xlsx";
      //
      const now = new Date();
      const formattedDate = now
        .toLocaleString("sv-SE", { hour12: false }) // sv-SE → format: YYYY-MM-DD HH:mm:ss
        .replace(" ", "_")
        .replace(/:/g, "-");

      a.download = `export-data_${formattedDate}.xlsx`;
      //
      // let fileName = "export-data";

      // if (startDate && endDate) {
      //   fileName += `_${startDate}_to_${endDate}`;
      // } else if (startDate) {
      //   fileName += `_from_${startDate}`;
      // } else if (endDate) {
      //   fileName += `_until_${endDate}`;
      // } else {
      //   fileName += ``;
      // }
      // a.download = `${fileName}.xlsx`;

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Data Berhasil Diexport");
      setSelectedSite("");
      setStartDate("");
      setEndDate("");
      console.log("Response: ", result);
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Gagal menghubungi server");
      setSelectedSite("");
      setStartDate("");
      setEndDate("");
    }

    // Tutup modal
    setShowExportModal(false);
  };

  const handleCancelExport = () => {
    setSelectedSite("");
    setStartDate("");
    setEndDate("");
    setShowExportModal(false);
  };

  const handleTyreClick = async (tyreId) => {
    try {
      const data = await apiFetch(`/activity/${tyreId}`);

      const tyre = {
        serialNumber: data.stockTyre.serialNumber,
        status: data.tyre.isInstalled ? "Installed" : "Not Installed",
        brand: data.stockTyre.merk.name,
        size: data.stockTyre.tyreSize.size,
        currentUnit: data.tyre.installedUnit?.nomorUnit || "N/A",
        position: `Pos ${data.tyre.positionTyre || "-"}`,
        installDate: new Date(
          data.tyre.stockTyre.dateTimeIn
        ).toLocaleDateString(),
        totalKm: data.tyre.kmTyre,
        avgTreadDepth: `${data.tyre.tread1}/${data.tyre.tread2}`,
        dateTimeWork: data.tyre.dateTimeWork
          ? new Date(data.tyre.dateTimeWork).toLocaleDateString()
          : "N/A",
      };

      const sortedActivities = [...data.activities].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const activityHistory = sortedActivities.map((act) => {
        const type =
          act.installedTyreId === data.tyre.id ? "Installation" : "Removal";

        const inspection = act.inspections?.[0];
        const actionTyre = inspection?.actionTyre;

        const descriptionLines = [
          `Date: ${new Date(act.dateTimeDone).toLocaleString()}`,
          `Unit: ${act.unit?.nomorUnit}`,
          `Location: ${act.location}`,
          type === "Installation"
            ? `Tread Install: ${act.tread1Install}/${act.tread2Install}`
            : type === "Removal" && act.tread1Remove != null
            ? `Tread Remove: ${act.tread1Remove}/${act.tread2Remove}`
            : null,
          `HM/KM: ${act.hmAtActivity}/${act.kmAtActivity}`,
          act.removePurpose?.name
            ? `Remove Purpose: ${act.removePurpose.name}`
            : null,
          act.airCondition?.name
            ? `Air Condition: ${act.airCondition.name}`
            : null,
          act.manpower ? `Manpower: ${act.manpower}` : null,
        ]
          .filter(Boolean)
          .join("\n");

        // console.log(actionTyre);
        return {
          type,
          description: descriptionLines,
          date: new Date(act.createdAt).toLocaleString(),
          inspectionDetail: inspection
            ? {
                removePurpose: inspection.removePurpose?.name || "-",
                incidentNote: inspection.incidentNote || "-",
                analysisNote: inspection.analysisNote || "-",
                dateTimeIn: inspection.dateTimeIn,
                dateTimeWork: inspection.dateTimeWork,
              }
            : null,
          actionTyreDetail: actionTyre
            ? {
                removePurpose: actionTyre?.removePurpose?.name || "-",
                dateTimeWork: actionTyre?.dateTimeWork,
                dateTimeDone: actionTyre?.dateTimeDone,
              }
            : null,
        };
      });

      setSelectedTyre(tyre);
      setActivityHistory(activityHistory);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };

  const handleDeleteTyre = async (tyreId) => {
    const tyre = tyres.find((t) => t.id === tyreId); // cari data ban berdasarkan ID
    if (!tyre) {
      toast.error("Data tyre tidak ditemukan.");
      return;
    }

    if (tyre.isInstalled || tyre.installedUnitId) {
      toast.error("Ban sedang terpasang di unit. Tidak dapat dihapus.");
      return;
    }

    if (!tyre.isReady && !tyre.isScrap) {
      toast.error("Status ban harus Ready/Scrap");
      return;
    }

    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus tyre ini?"
    );
    if (!confirmed) return;

    const dataDelete = {
      deletedBy: username,
    };

    try {
      await apiFetch(`/tyre/${tyreId}`, {
        method: "DELETE",
        body: JSON.stringify(dataDelete),
      });

      toast.success("Tyre berhasil dihapus.");
      await fetchTyres();
      await fetchUnits();
    } catch (error) {
      console.error("Gagal menghapus tyre:", error);
      toast.error("Gagal menghapus tyre.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedTyre(null);
    setActivityHistory([]);
  };

  const fetchTyres = async () => {
    try {
      const result = await apiFetch("/tyre");
      setTyres(result.data);
    } catch (error) {
      console.error("Gagal mengambil data ban:", error);
    }
  };

  const fetchUnits = async () => {
    try {
      const result = await apiFetch("/unit");
      setUnits(result.data);
    } catch (error) {
      console.error("Gagal mengambil data unit:", error);
    }
  };

  const fetchSite = async () => {
    try {
      const data = await apiFetch("/dropdown");

      // Set state dari response API
      setSiteList(data.site || []);
    } catch (error) {
      console.error("Gagal fetch data dropdown:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('URL_API_KAMU');
        const data = await apiFetch("/dropdown");

        const totalUnit = data.unit?.length || 0;
        const totalTyre = data.tyre?.length || 0;
        const installedTyre =
          data.tyre?.filter((t) => t.isInstalled)?.length || 0;
        const removedTyre =
          data.tyre?.filter((t) => !t.isInstalled)?.length || 0;
        const scrapTyre = data.tyre?.filter((t) => t.isScrap)?.length || 0;

        const result = await apiFetch("/user");
        const userTotal = result.data?.length || 0;

        setSummary({
          totalUnit,
          totalTyre,
          installedTyre,
          removedTyre,
          scrapTyre,
          userTotal,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchTyres();
    fetchUnits();
    fetchData();
    fetchSite();
  }, []);

  const getStatus = (tyre) => {
    if (tyre.isScrap)
      return { label: "Scrap", className: "bg-gray-300 text-gray-800" };
    if (tyre.isInstalled)
      return { label: "Installed", className: "bg-green-200 text-green-700" };
    if (tyre.isReady)
      return { label: "Ready", className: "bg-yellow-200 text-green-700" };
    return { label: "Removed", className: "bg-red-200 text-red-700" };
  };

  const filteredUnits =
    user?.roleId === 1
      ? units
      : units.filter((unit) => unit.site.name === user.roleUser.name);

  const filteredTyres =
    user?.roleId === 1
      ? tyres
      : tyres.filter((tyre) => tyre.site.name === user.roleUser.name);

  const filteredTyresInstall = filteredTyres.filter(
    (tyre) => tyre.isInstalled === true
  );
  const filteredTyresRemove = filteredTyres.filter(
    (tyre) => tyre.isInstalled === false && tyre.isScrap === false
    // &&
    // tyre.isReady === false
  );
  const filteredTyresScrap = filteredTyres.filter(
    (tyre) => tyre.isScrap === true
  );

  // Pagination logic untuk data ban
  const indexOfLastTyre = currentPageTyre * itemsPerPage;
  const indexOfFirstTyre = indexOfLastTyre - itemsPerPage;
  const currentTyres = filteredTyres.slice(indexOfFirstTyre, indexOfLastTyre);
  const totalPagesTyre = Math.ceil(tyres.length / itemsPerPage);

  // Pagination logic untuk data unit
  const indexOfLastUnit = currentPageUnit * itemsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - itemsPerPage;
  const currentUnits = filteredUnits.slice(indexOfFirstUnit, indexOfLastUnit);
  const totalPagesUnit = Math.ceil(units.length / itemsPerPage);

  //pagination logic data ban terpasang
  const indexOfLastTyreInstall = currentPageTyreInstall * itemsPerPage;
  const indexOfFirstTyreInstall = indexOfLastTyreInstall - itemsPerPage;
  const currentTyresInstall = filteredTyresInstall.slice(
    indexOfFirstTyreInstall,
    indexOfLastTyreInstall
  );
  const totalPagesTyreInstall = Math.ceil(
    filteredTyresInstall.length / itemsPerPage
  );

  //pagination logic data ban terlepas
  const indexOfLastTyreRemove = currentPageTyreRemove * itemsPerPage;
  const indexOfFirstTyreRemove = indexOfLastTyreRemove - itemsPerPage;
  const currentTyresRemove = filteredTyresRemove.slice(
    indexOfFirstTyreRemove,
    indexOfLastTyreRemove
  );
  const totalPagesTyreRemove = Math.ceil(
    filteredTyresRemove.length / itemsPerPage
  );
  //pagination logic data ban scrap
  const indexOfLastTyreScrap = currentPageTyreScrap * itemsPerPage;
  const indexOfFirstTyreScrap = indexOfLastTyreScrap - itemsPerPage;
  const currentTyresScrap = filteredTyresScrap.slice(
    indexOfFirstTyreScrap,
    indexOfLastTyreScrap
  );
  const totalPagesTyreScrap = Math.ceil(
    filteredTyresScrap.length / itemsPerPage
  );

  // Fungsi paginate tyre
  const paginateTyre = (pageNumber) => setCurrentPageTyre(pageNumber);
  const handlePrevTyre = () => {
    if (currentPageTyre > 1) setCurrentPageTyre(currentPageTyre - 1);
  };
  const handleNextTyre = () => {
    if (currentPageTyre < totalPagesTyre)
      setCurrentPageTyre(currentPageTyre + 1);
  };

  // Fungsi paginate unit
  const paginateUnit = (pageNumber) => setCurrentPageUnit(pageNumber);
  const handlePrevUnit = () => {
    if (currentPageUnit > 1) setCurrentPageUnit(currentPageUnit - 1);
  };
  const handleNextUnit = () => {
    if (currentPageUnit < totalPagesUnit)
      setCurrentPageUnit(currentPageUnit + 1);
  };

  // Fungsi paginate ban terpasang
  const paginateInstall = (pageNumber) => setCurrentPageTyreInstall(pageNumber);
  const handlePrevTyreInstall = () => {
    if (currentPageTyreInstall > 1)
      setCurrentPageTyreInstall(currentPageTyreInstall - 1);
  };
  const handleNextTyreInstall = () => {
    if (currentPageTyreInstall < totalPagesTyreInstall)
      setCurrentPageTyreInstall(currentPageTyreInstall + 1);
  };

  // Fungsi paginate ban terlepas
  const paginateRemove = (pageNumber) => setCurrentPageTyreRemove(pageNumber);
  const handlePrevTyreRemove = () => {
    if (currentPageTyreRemove > 1)
      setCurrentPageTyreRemove(currentPageTyreRemove - 1);
  };
  const handleNextTyreRemove = () => {
    if (currentPageTyreRemove < totalPagesTyreRemove)
      setCurrentPageTyreRemove(currentPageTyreRemove + 1);
  };

  // Fungsi paginate ban scrap
  const paginateScrap = (pageNumber) => setCurrentPageTyreScrap(pageNumber);
  const handlePrevTyreScrap = () => {
    if (currentPageTyreScrap > 1)
      setCurrentPageTyreScrap(currentPageTyreScrap - 1);
  };
  const handleNextTyreScrap = () => {
    if (currentPageTyreScrap < totalPagesTyreScrap)
      setCurrentPageTyreScrap(currentPageTyreScrap + 1);
  };

  return (
    <div className="w-full bg-gray-100 p-2 rounded-md shadow-none">
      {/* Header */}
      <div className="flex items-ends justify-between mb-6 ml-3">
        <div>
          <p className="text-sm text-gray-500">Pages / Main Dashboard</p>
          <h1 className="text-3xl font-bold text-[#1a1f36]">Main Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4 mt-3">
          <p className="text-lg mr-2 font-semibold">Hello, {username}</p>
          <img
            src={userLogo}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-500 shadow-md"
          />
        </div>
      </div>

      {/* Content bawah header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {roleId === 1 && (
          <>
            <SummaryCard
              title="Unit Total"
              value={summary.totalUnit}
              icon={<TruckIcon className="w-10 h-10" />}
              borderColor="border-green-500"
            />
            <SummaryCard
              title="Tyre Total"
              value={summary.totalTyre}
              icon={<ArchiveBoxIcon className="w-10 h-10" />}
              borderColor="border-red-500"
            />
            <SummaryCard
              title="Installed Tyre"
              value={summary.installedTyre}
              icon={<CheckCircleIcon className="w-10 h-10" />}
              borderColor="border-yellow-500"
            />
            <SummaryCard
              title="Removed Tyre"
              value={summary.removedTyre}
              icon={<TrashIcon className="w-10 h-10" />}
              borderColor="border-blue-500"
            />
            <SummaryCard
              title="Scrap Tyre"
              value={summary.scrapTyre}
              icon={<ArchiveBoxIcon className="w-10 h-10" />}
              borderColor="border-purple-500"
            />
            <SummaryCard
              title="Total user"
              value={summary.userTotal}
              icon={<UserIcon className="w-10 h-10" />}
              borderColor="border-orange-500"
            />
          </>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <UnitTable
          units={currentUnits}
          onClickUnit={fetchUnitDetails}
          currentPage={currentPageUnit}
          totalPages={totalPagesUnit}
          onPageChange={paginateUnit}
          onPrev={handlePrevUnit}
          onNext={handleNextUnit}
          indexOfFirstUnit={indexOfFirstUnit}
        />
        <UnitDetailModal
          unitData={selectedUnit}
          isOpen={isUnitModalOpen}
          onClose={() => setIsUnitModalOpen(false)}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TyreTableAction
            title="Tyre List"
            tyres={currentTyres}
            onClickTyre={handleTyreClick}
            navigateTo={() => navigate("/actvtyres")}
            currentPage={currentPageTyre}
            totalPages={totalPagesTyre}
            onPageChange={paginateTyre}
            onPrev={handlePrevTyre}
            onNext={handleNextTyre}
            indexOfFirstItem={indexOfFirstTyre}
            getStatus={getStatus}
            onDeleteTyre={handleDeleteTyre}
          />
          <TyreDetailModal
            show={showPopup}
            onClose={handleClosePopup}
            tyre={selectedTyre}
            activityHistory={activityHistory}
          />

          <TyreTable
            title="Tyre Installed"
            tyres={currentTyresInstall}
            onClickTyre={handleTyreClick}
            navigateTo={() => navigate("/actvtyres")}
            currentPage={currentPageTyreInstall}
            totalPages={totalPagesTyreInstall}
            onPageChange={paginateInstall}
            onPrev={handlePrevTyreInstall}
            onNext={handleNextTyreInstall}
            indexOfFirstItem={indexOfFirstTyreInstall}
            getStatus={getStatus}
          />
          <TyreDetailModal
            show={showPopup}
            onClose={handleClosePopup}
            tyre={selectedTyre}
            activityHistory={activityHistory}
          />

          <TyreTable
            title="Tyre Removed"
            tyres={currentTyresRemove}
            onClickTyre={handleTyreClick}
            navigateTo={() => navigate("/actvtyres")}
            currentPage={currentPageTyreRemove}
            totalPages={totalPagesTyreRemove}
            onPageChange={paginateRemove}
            onPrev={handlePrevTyreRemove}
            onNext={handleNextTyreRemove}
            indexOfFirstItem={indexOfFirstTyreRemove}
            getStatus={getStatus}
          />
          <TyreDetailModal
            show={showPopup}
            onClose={handleClosePopup}
            tyre={selectedTyre}
            activityHistory={activityHistory}
          />

          <TyreTable
            title="Tyre Scrap"
            tyres={currentTyresScrap}
            onClickTyre={handleTyreClick}
            navigateTo={() => navigate("/actvtyres")}
            currentPage={currentPageTyreScrap}
            totalPages={totalPagesTyreScrap}
            onPageChange={paginateScrap}
            onPrev={handlePrevTyreScrap}
            onNext={handleNextTyreScrap}
            indexOfFirstItem={indexOfFirstTyreScrap}
            getStatus={getStatus}
          />
          <TyreDetailModal
            show={showPopup}
            onClose={handleClosePopup}
            tyre={selectedTyre}
            activityHistory={activityHistory}
          />
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setShowExportModal(true)}
            className="bg-yellow-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
          >
            Export Data
          </button>
        </div>
        <ExportModal
          show={showExportModal}
          onClose={handleCancelExport}
          onSubmit={handleExportSubmit}
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          siteList={siteList}
          user={user}
        />
      </div>
    </div>
  );
};

export default Home;
