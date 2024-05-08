import { Collapse, Modal, Popover, Select, Table } from "antd";
import { Footer, Image, Nav } from "../components";
import { Link } from "react-router-dom";

// flatIcons
import budgetFlatIcon from "../assets/Flaticons/budget.png";
// react-icons
import { BsQuestionSquareFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
// hook
import { useEffect, useMemo, useState } from "react";
import { textGross, textNet } from "../constants";
import {
  basicWage,
  bhtn,
  bhxh,
  bhyt,
  calculateEarningPersonalGross,
  calculateEarningPersonalNet,
  dependentWage,
  personalFamilyReduceWage,
  regionMinimumWage,
} from "../constants/salaryGross-Net";
import {
  convertCurrency,
  convertCurrencyVND,
  convertVNDToUSD,
  currencyFormat,
} from "../constants/convertData";
import CurrencyInput from "react-currency-input-field";
// import { IoCaretDownOutline } from "react-icons/io5";

const Intro = () => {
  return (
    <div className="w-full">
      <p className="text-indigo-600 text-2xl font-medium pb-3">
        Các câu hỏi thường gặp (FAQs)
      </p>

      <div className="flex-between gap-4 w-full">
        <div className="flex justify-between w-full gap-10">
          <div className="w-1/2  drop-shadow-md py-1 min-h-10">
            <Collapse
              items={[
                {
                  key: "what-is-gross",
                  label: (
                    <p className="text-xl font-medium text-gray-600 ">
                      Lương Gross là gì?
                    </p>
                  ),
                  children: (
                    <p className="text-base text-gray-500 min-h-24">
                      Lương Gross là tổng số tiền mà người lao động nhận được
                      trước khi trừ các khoản thuế, bảo hiểm, phụ cấp và các chi
                      phí khác. Đây là số tiền thường được đưa ra khi đàm phán
                      về mức lương và được thông báo trong hợp đồng lao động.
                    </p>
                  ),
                  style: {
                    marginBottom: 24,
                    border: "none",
                    backgroundColor: "#F1F5F9",
                    padding: "8px 0 0 0",
                  },
                },
              ]}
              size="small"
            />
          </div>
          <div className="w-1/2 drop-shadow-md py-1">
            <Collapse
              items={[
                {
                  key: "what-is-net",
                  label: (
                    <p className="text-xl font-medium text-gray-600">
                      Lương Net là gì?
                    </p>
                  ),
                  children: (
                    <p className="text-base text-gray-500 min-h-24">
                      Lương Net là lương thực nhận của người lao động sau khi đã
                      trừ hết các khoản bảo hiểm, thuế thu nhập cá nhân và các
                      chi phí khấu trừ khác. Lương Net sẽ thấp hơn lương Gross
                      do phải trừ đi các khoản thuế phí.
                    </p>
                  ),
                  style: {
                    marginBottom: 24,
                    border: "none",
                    backgroundColor: "#F1F5F9",
                    padding: "8px 0 0 0",
                  },
                },
              ]}
              size="small"
            />
          </div>
        </div>
      </div>

      <div className="flex-between gap-4 w-full">
        <div className="flex justify-between w-full gap-10">
          <div className="w-1/2  drop-shadow-md py-1 min-h-10">
            <Collapse
              items={[
                {
                  key: "receipt-gross",
                  label: (
                    <p className="text-xl font-medium text-gray-600 ">
                      Công thức tính lương Gross là gì?
                    </p>
                  ),
                  children: (
                    <p className="text-base text-gray-500 min-h-24">
                      Lương Gross = Lương cơ bản + Thưởng + Thuế thu nhập cá
                      nhân + Bảo hiểm xã hội + Bảo hiểm y tế + Bảo hiểm thất
                      nghiệp + Các khoản chi phí khác
                    </p>
                  ),
                  style: {
                    marginBottom: 24,
                    border: "none",
                    backgroundColor: "#F1F5F9",
                    padding: "8px 0 0 0",
                  },
                },
              ]}
              size="small"
            />
          </div>
          <div className="w-1/2 drop-shadow-md py-1">
            <Collapse
              items={[
                {
                  key: "receipt-net",
                  label: (
                    <p className="text-xl font-medium text-gray-600">
                      Công thức tính lương Net là gì?
                    </p>
                  ),
                  children: (
                    <p className="text-base text-gray-500 min-h-24">
                      Lương Net = Tổng thu nhập - (Thuế thu nhập cá nhân + Bảo
                      hiểm xã hội + Bảo hiểm y tế + Bảo hiểm thất nghiệp + Các
                      khoản khấu trừ khác)
                    </p>
                  ),
                  style: {
                    marginBottom: 24,
                    border: "none",
                    backgroundColor: "#F1F5F9",
                    padding: "8px 0 0 0",
                  },
                },
              ]}
              size="small"
            />
          </div>
        </div>
      </div>

      <div className="flex-between gap-4 w-full">
        <div className="flex justify-between w-full gap-10">
          <div className="w-1/2  drop-shadow-md py-1 min-h-10">
            <Collapse
              items={[
                {
                  key: "convert-gross-to-net",
                  label: (
                    <p className="text-xl font-medium text-gray-600 ">
                      Cách tính lương Gross sang Net?
                    </p>
                  ),
                  children: (
                    <p className="text-base text-gray-500 min-h-24">
                      Sau khi trừ đi các khoản phí và thuế trên lương Gross, ta
                      sẽ thu được số tiền lương Net. Công thức chung để tính
                      lương Gross sang Net là: Lương Net = Lương Gross - (Thuế
                      thu nhập cá nhân + Bảo hiểm xã hội + Bảo hiểm y tế + Bảo
                      hiểm thất nghiệp + Các khoản khấu trừ khác)
                    </p>
                  ),
                  style: {
                    marginBottom: 24,
                    border: "none",
                    backgroundColor: "#F1F5F9",
                    padding: "8px 0 0 0",
                  },
                },
              ]}
              size="small"
            />
          </div>
          <div className="w-1/2 drop-shadow-md py-1">
            <Collapse
              items={[
                {
                  key: "convert-net-to-gross",
                  label: (
                    <p className="text-xl font-medium text-gray-600">
                      Cách quy đổi lương Net sang Gross?
                    </p>
                  ),
                  children: (
                    <p className="text-base text-gray-500 min-h-24">
                      Để quy đổi lương Net sang lương Gross, ta cần tính toán
                      lại các khoản phí và thuế đã bị trừ đi từ lương Gross.
                      Công thức quy đổi từ lương Net sang lương Gross như sau:
                      Lương Gross = Lương Net + Thuế thu nhập cá nhân + Bảo hiểm
                      xã hội + Bảo hiểm y tế + Bảo hiểm thất nghiệp + Các khoản
                      chi phí khác
                    </p>
                  ),
                  style: {
                    marginBottom: 24,
                    border: "none",
                    backgroundColor: "#F1F5F9",
                    padding: "8px 0 0 0",
                  },
                },
              ]}
              size="small"
            />
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border-2 border-dashed p-4 rounded-md border-indigo-200">
        <p className="">
          Việc lựa chọn lương Net hay gross khi tìm việc hoàn toàn không ảnh
          hưởng đến mức thu nhập thực tế, hay nói cách khác khoản thu cuối cùng
          từ hai hình thức này là bằng nhau. Đồng thời, từ phân tích có thể
          thấy, Net và gross đều tồn tại song song các ưu và nhược điểm. Vậy
          nên, người lao động có thể căn cứ vào sự so sánh để lựa chọn hình thức
          phù hợp nhất với nhu cầu của cá nhân mình. Đối với lương Net, người
          lao động sẽ được doanh nghiệp trích một phần lương ra để đóng và bảo
          hiểm và các khoản phải nộp, điều đó dễ dàng cho doanh nghiệp trong
          công tác xây dựng chính sách nhân sự về chế độ đãi ngộ, tiền lương,
          phụ cấp,...Trong trường hợp công ty (bên sử dụng lao động) không làm
          đúng theo thỏa thuận trong hợp đồng cũng như vi phạm quy định pháp
          luật, người lao động có quyền khai báo với cơ quan có thẩm quyền can
          thiệp nhằm đảm bảo được hưởng các quyền lợi cá nhân. Khi doanh nghiệp
          thỏa thuận dựa trên lương Net thì đây là số tiền thực nhận, người lao
          động sẽ được nhận đúng vào mỗi tháng làm việc
        </p>
      </div>
    </div>
  );
};

const ContentTextRegion = () => {
  return (
    <div className="w-[700px] flex flex-col gap-2 text-gray-600 ">
      <div className="w-full">
        <p>Lương cơ sở: {basicWage}</p>
        <p>Giảm trừ gia cảnh bản thân: 4,400,000 / người / tháng</p>
        <p>Người phụ thuộc: 4,400,000 / người / tháng</p>
      </div>

      <div className="w-full">
        <p>Mức lương tối thiểu vùng:</p>
        <ul className="list-disc pl-3">
          <li>Vùng I: 4,680,000 đồng/tháng</li>
          <li>Vùng II: 4,160,000 đồng/tháng</li>
          <li>Vùng III: 3,640,000 đồng/tháng</li>
          <li>Vùng IV: 3,250,000 đồng/tháng</li>
        </ul>
      </div>

      <div className="w-full">
        <p>Chi tiết bao gồm:</p>
        <ul className="list-decimal pl-3">
          <li>
            <span className="font-bold">Vùng I, gồm các địa bàn:</span>
            <ul className="list-disc pl-3">
              <li>
                Các quận và các huyện Gia Lâm, Đông Anh, Sóc Sơn, Thanh Trì,
                Thường Tín, Hoài Đức, Thạch Thất, Quốc Oai, Thanh Oai, Mê Linh,
                Chương Mỹ và thị xã Sơn Tây thuộc thành phố Hà Nội;
              </li>
              <li>
                Các quận và các huyện Thủy Nguyên, An Dương, An Lão, Vĩnh Bảo
                thuộc thành phố Hải Phòng;
              </li>
              <li>
                Các quận và các huyện Củ Chi, Hóc Môn, Bình Chánh, Nhà Bè thuộc
                thành phố Hồ Chí Minh;
              </li>
              <li>
                Thành phố Biên Hòa, thị xã Long Khánh và các huyện Nhơn Trạch,
                Long Thành, Vĩnh Cửu, Trảng Bom thuộc tỉnh Đồng Nai;
              </li>
              <li>
                Thành phố Thủ Dầu Một, các thị xã Thuận An, Dĩ An, Bến Cát, Tân
                Uyên và các huyện Bàu Bàng, Bắc Tân Uyên thuộc tỉnh Bình Dương;
              </li>
              <li>Thành phố Vũng Tàu, huyện Tân Thành thuộc tỉnh Bà Rịa</li>
              <li>Vũng Tàu.</li>
            </ul>
          </li>
          <li>
            <span className="font-bold">Vùng II, gồm các địa bàn:</span>
            <ul className="list-disc pl-3">
              <li>Các huyện còn lại thuộc thành phố Hà Nội;</li>
              <li>Các huyện còn lại thuộc thành phố Hải Phòng;</li>
              <li>Thành phố Hải Dương thuộc tỉnh Hải Dương;</li>
              <li>
                Thành phố Hưng Yên và các huyện Mỹ Hào, Văn Lâm, Văn Giang, Yên
                Mỹ thuộc tỉnh Hưng Yên;
              </li>
              <li>
                Thành phố Vĩnh Yên, thị xã Phúc Yên và các huyện Bình Xuyên, Yên
                Lạc thuộc tỉnh Vĩnh Phúc;
              </li>
              <li>
                Thành phố Bắc Ninh, thị xã Từ Sơn và các huyện Quế Võ, Tiên Du,
                Yên Phong, Thuận Thành thuộc tỉnh Bắc Ninh;
              </li>
              <li>
                Các thành phố Thái Nguyên, Sông Công và thị xã Phổ Yên thuộc
                tỉnh Thái Nguyên
              </li>
              <li>Thành phố Việt Trì thuộc tỉnh Phú Thọ</li>
              <li>Thành phố Lào Cai thuộc tỉnh Lào Cai</li>
              <li>Thành phố Nam Định và huyện Mỹ Lộc thuộc tỉnh Nam Định</li>
              <li>Thành phố Ninh Bình thuộc tỉnh Ninh Bình</li>
              <li>Thành phố Huế thuộc tỉnh Thừa Thiên Huế</li>
              <li>Các Thành phố Hội An, Tam kỳ thuộc tỉnh Quảng Nam</li>
              <li>Các quận, huyện thuộc thành phố Đà Nẵng</li>
              <li>Các thành phố Nha Trang, Cam Ranh thuộc tỉnh Khánh Hòa</li>
              <li>Các thành phố Đà Lạt, Bảo Lộc thuộc tỉnh Lâm Đồng</li>
              <li>Thành phố Phan Thiết thuộc tỉnh Bình Thuận</li>
              <li>Huyện Cần Giờ thuộc thành phố Hồ Chí Minh</li>
              <li>
                Thành phố Tây Ninh và các huyện Trảng Bàng, Gò Dầu thuộc tỉnh
                Tây Ninh
              </li>
              <li>
                Các huyện Định Quán, Xuân Lộc, Thống Nhất thuộc tỉnh Đồng Nai
              </li>
              <li>Các huyện còn lại thuộc tỉnh Bình Dương</li>
              <li>
                Thị xã Đồng Xoài và huyện Chơn Thành thuộc tỉnh Bình Phước
              </li>
              <li>Thành phố Bà Rịa thuộc tỉnh Bà Rịa - Vũng Tàu</li>
              <li>
                Thành phố Tân An và các huyện Đức Hòa, Bến Lức, Thủ Thừa, Cần
                Đước, Cần Giuộc thuộc tỉnh Long An
              </li>
              <li>Thành phố Mỹ Tho thuộc tỉnh Tiền Giang</li>
              <li>Các quận thuộc thành phố Cần Thơ</li>
              <li>
                Thành phố Rạch Giá, thị xã Hà Tiên và huyện Phú Quốc thuộc tỉnh
                Kiên Giang
              </li>
              <li>Các thành phố Long Xuyên, Châu Đốc thuộc tỉnh An Giang</li>
              <li>Thành phố Trà Vinh thuộc tỉnh Trà Vinh</li>
              <li>Thành phố Cà Mau thuộc tỉnh Cà Mau</li>
            </ul>
          </li>
          <li>
            <span className="font-bold">Vùng III, gồm các địa bàn:</span>
            <ul className="list-disc pl-3">
              <li>
                Các thành phố trực thuộc tỉnh còn lại (trừ các thành phố trực
                thuộc tỉnh nêu tại vùng I, vùng II)
              </li>
              <li>
                Thị xã Chí Linh và các huyện Cẩm Giàng, Nam Sách, Kim Thành,
                Kinh Môn, Gia Lộc, Bình Giang, Tứ Kỳ thuộc tỉnh Hải Dương
              </li>
              <li>
                Các huyện Vĩnh Tường, Tam Đảo, Tam Dương, Lập Thạch, Sông Lô
                thuộc tỉnh Vĩnh Phúc
              </li>
              <li>
                Thị xã Phú Thọ và các huyện Phù Ninh, Lâm Thao, Thanh Ba, Tam
                Nông thuộc tỉnh Phú Thọ
              </li>
              <li>Các huyện Gia Bình, Lương Tài thuộc tỉnh Bắc Ninh</li>
              <li>
                Các huyện Việt Yên, Yên Dũng, Hiệp Hòa, Tân Yên, Lạng Giang
                thuộc tỉnh Bắc Giang
              </li>
              <li>
                Các thị xã Quảng Yên, Đông Triều và huyện Hoành Bồ thuộc tỉnh
                Quảng Ninh
              </li>
              <li>Các huyện Bảo Thắng, Sa Pa thuộc tỉnh Lào Cai</li>
              <li>Các huyện còn lại thuộc tỉnh Hưng Yên</li>
              <li>
                Các huyện Phú Bình, Phú Lương, Đồng Hỷ, Đại Từ thuộc tỉnh Thái
                Nguyên
              </li>
              <li>Các huyện còn lại thuộc tỉnh Nam Định</li>
              <li>Các huyện Duy Tiên, Kim Bảng thuộc tỉnh Hà Nam</li>
              <li>
                Các huyện Gia Viễn, Yên Khánh, Hoa Lư thuộc tỉnh Ninh Bình
              </li>
              <li>Huyện Lương Sơn thuộc tỉnh Hòa Bình</li>
              <li>Thị xã Bỉm Sơn và huyện Tĩnh Gia thuộc tỉnh Thanh Hóa</li>
              <li>Thị xã Kỳ Anh thuộc tỉnh Hà Tĩnh</li>
              <li>
                Các thị xã Hương Thủy, Hương Trà và các huyện Phú Lộc, Phong
                Điền, Quảng Điền, Phú Vang thuộc tỉnh Thừa Thiên Huế
              </li>
              <li>
                Thị xã Điện Bàn và các huyện Đại Lộc, Duy Xuyên, Núi Thành, Quế
                Sơn, Thăng Bình thuộc tỉnh Quảng Nam
              </li>
              <li>Các huyện Bình Sơn, Sơn Tịnh thuộc tỉnh Quảng Ngãi</li>
              <li>Thị xã Sông Cầu và huyện Đông Hòa thuộc tỉnh Phú Yên</li>
              <li>Các huyện Ninh Hải, Thuận Bắc thuộc tỉnh Ninh Thuận</li>
              <li>
                Thị xã Ninh Hòa và các huyện Cam Lâm, Diên Khánh, Vạn Ninh thuộc
                tỉnh Khánh Hòa
              </li>
              <li>Huyện Đăk Hà thuộc tỉnh Kon Tum</li>
              <li>Các huyện Đức Trọng, Di Linh thuộc tỉnh Lâm Đồng</li>
              <li>
                Thị xã La Gi và các huyện Hàm Thuận Bắc, Hàm Thuận Nam thuộc
                tỉnh Bình Thuận
              </li>
              <li>
                Các thị xã Phước Long, Bình Long và các huyện Đồng Phú, Hớn Quản
                thuộc tỉnh Bình Phước
              </li>
              <li>Các huyện còn lại thuộc tỉnh Tây Ninh</li>
              <li>Các huyện còn lại thuộc tỉnh Đồng Nai</li>
              <li>
                Các huyện Long Điền, Đất Đỏ, Xuyên Mộc, Châu Đức, Côn Đảo thuộc
                tỉnh Bà Rịa
              </li>
              <li>Vũng Tàu</li>
              <li>
                Thị xã Kiến Tường và các huyện Đức Huệ, Châu Thành, Tân Trụ,
                Thạnh Hóa thuộc tỉnh Long An
              </li>
              <li>
                Các thị xã Gò Công, Cai Lậy và các huyện Châu Thành, Chợ Gạo
                thuộc tỉnh Tiền Giang
              </li>
              <li>Huyện Châu Thành thuộc tỉnh Bến Tre</li>
              <li>Thị xã Bình Minh và huyện Long Hồ thuộc tỉnh Vĩnh Long</li>
              <li>Các huyện thuộc thành phố Cần Thơ</li>
              <li>
                Các huyện Kiên Lương, Kiên Hải, Châu Thành thuộc tỉnh Kiên Giang
              </li>
              <li>
                Thị xã Tân Châu và các huyện Châu Phú, Châu Thành, Thoại Sơn
                thuộc tỉnh An Giang
              </li>
              <li>
                Thị xã Ngã Bảy và các huyện Châu Thành, Châu Thành A thuộc tỉnh
                Hậu Giang
              </li>
              <li>Thị xã Duyên Hải thuộc tỉnh Trà Vinh</li>
              <li>Thị xã Giá Rai thuộc tỉnh Bạc Liêu</li>
              <li>Các thị xã Vĩnh Châu, Ngã Năm thuộc tỉnh Sóc Trăng</li>
              <li>
                Các huyện Năm Căn, Cái Nước, U Minh, Trần Văn Thời thuộc tỉnh Cà
                Mau.
              </li>
            </ul>
          </li>
          <li className="font-bold">Vùng IV, gồm các địa bàn còn lại</li>
        </ul>
      </div>
    </div>
  );
};

const FormCalculate = () => {
  const [isActive, setIsActive] = useState(true); // true = Gross --> Net, fasle = Net --> Gross
  const [isVND, setIsVND] = useState(true); // true = Gross --> Net, fasle = Net --> Gross
  const [isModalRegionDescOpen, setIsModalRegionDescOpen] = useState(false);
  const [isModalCalculateOpen, setIsModalCalculateOpen] = useState(false);

  const [salary, setSalary] = useState(0);

  const [peopleDependentce, setPeopleDependentce] = useState(0);
  const [salaryInsurance, setSalaryInsurance] = useState(0);
  const [insurance, setInsurance] = useState("primary");
  const [region, setRegion] = useState("I");

  const [salaryBHXH, setSalaryBHXH] = useState(0);
  const [salaryBHYT, setSalaryBHYT] = useState(0);
  const [salaryBHTN, setSalaryBHTN] = useState(0);

  useEffect(() => {
    if (salary > 20 * basicWage) {
      setSalaryBHXH(20 * basicWage * bhxh);
      setSalaryBHYT(20 * basicWage * bhyt);
    } else {
      setSalaryBHXH(salary * bhxh);
      setSalaryBHYT(salary * bhyt);
    }

    if (salary > 20 * regionMinimumWage[region]) {
      setSalaryBHTN(20 * regionMinimumWage[region] * bhtn);
    } else {
      setSalaryBHTN(salary * bhtn);
    }
  }, [salary, regionMinimumWage[region]]);

  const earningBeforeFax = useMemo(() => {
    return Number(salary) - (salaryBHXH + salaryBHYT + salaryBHTN);
  }, [salary, salaryBHXH, salaryBHYT, salaryBHTN]);

  const earningFax = useMemo(() => {
    let result = 0;
    if (earningBeforeFax > personalFamilyReduceWage) {
      result =
        earningBeforeFax -
        (personalFamilyReduceWage + dependentWage * Number(peopleDependentce));
    }
    if (result > 0) return result;
    return 0;
  }, [salary, earningBeforeFax, personalFamilyReduceWage, peopleDependentce]);

  // NETTTTTTTTTTTTTTTTTTTTTT-----------------------------------------------------------------------------------------------------
  const earningFaxNet = useMemo(() => {
    return Math.round(
      calculateEarningPersonalNet(
        salary - personalFamilyReduceWage - dependentWage * peopleDependentce
      )
    );
  }, [salary, peopleDependentce]);
  const earningPersonalFax = useMemo(() => {
    let TNQD =
      salary - personalFamilyReduceWage - dependentWage * peopleDependentce;

    return Math.round(earningFaxNet - TNQD);
  }, [salary, peopleDependentce]);

  const resultNetToGross = useMemo(() => {
    let result = 0;
    result = Math.round(
      (Number(salary) + earningPersonalFax) / (1 - (bhxh + bhyt + bhtn))
    );

    if (result >= 20 * basicWage)
      result =
        Number(salary) +
        earningPersonalFax +
        20 * basicWage * bhxh +
        20 * basicWage * bhyt +
        20 * regionMinimumWage[region] * bhtn;
    return result;
  }, [salary, earningPersonalFax]);
  // ---------------------------------------------------------------------------------------------------------------------------
  const contentWhatIsGross = () => (
    <div className="w-72">
      <p>{textGross}</p>
    </div>
  );

  const contentWhatIsNet = () => (
    <div className="w-72">
      <p>{textNet}</p>
    </div>
  );

  const contentTextPeopleDependent = () => (
    <div className="w-72">
      <p>
        Người phụ thuộc là người mà đối tượng nộp thuể thu nhập cá nhân có trách
        nhiệm nuôi dưỡng.
      </p>
      <br />
      <p>Bao gồm:</p>
      <ul className="list-disc pl-3">
        <li>
          Con chưa thành niên; con bị tàn tật, không có khả năng lao động;
        </li>
        <li>
          Các cá nhân không có thu nhập hoặc có thu nhập không vượt quá mức quy
          định. Bao gồm con thành niên đang học đại học, cao đẳng. trung học
          chuyên nghiệp hoặc học nghề; vợ hoặc chồng không có khả năng lao động;
          bố, mẹ đã hết tuổi lao động hoặc không có khả năng lao động; những
          người khác không nơi nương tựa mà người nộp thuế phải trực tiếp nuôi
          dưỡng.
        </li>
      </ul>
    </div>
  );

  const ContentCalculateGrossToNet = () => {
    const TableEarningPersonalDetail = ({ val }) => {
      let arrEarning = [250000, 500000, 1200000, 2800000, 5000000, 8400000, 0];
      let arrLevelTax = [
        "Đến 5 triệu VND",
        "Trên 5 đến 10 triệu VND",
        "Trên 10 đến 18 triệu VND",
        "Trên 18 đến 32 triệu VND",
        "Trên 32 đến 52 triệu VND",
        "Trên 52 đến 80 triệu VND",
        "Trên 80 triệu VND",
      ];
      let arrTax = ["5%", "10%", "15%", "20%", "25%", "30%", "35%"];

      const cols = useMemo(
        () => [
          {
            title: "Mức chịu thuế",
            dataIndex: "levelTax",
            key: "levelTax",
            render: (text) => <p>{text}</p>,
          },
          {
            title: "Thuế suất",
            dataIndex: "Tax",
            key: "Tax",
            render: (text) => <p className="text-end">{text}</p>,
          },
          {
            title: <p className="text-end">Tiền nộp</p>,
            dataIndex: "payment",
            key: "payment",
            render: (text) => <p className="text-end">{text}</p>,
          },
        ],
        []
      );

      const dataTable = useMemo(() => {
        let result = [];
        let sum = 0;
        let sumPrev = 0;

        for (let i = 0; i < arrEarning.length; i++) {
          sum += arrEarning[i];
          if (val > sum) {
            if (i === arrEarning.length - 1) {
              result.push(val - sumPrev);
            }
            result.push(arrEarning[i]);
          } else {
            if (val > sumPrev) {
              result.push(val - sumPrev);
            } else {
              result.push(0);
            }
          }
          sumPrev += arrEarning[i];
        }

        let arrResult = [];
        arrResult = result.map((paymenI, idx) => ({
          key: { idx },
          levelTax: arrLevelTax[idx],
          Tax: arrTax[idx],
          payment: convertCurrency(paymenI),
        }));

        return arrResult;
      }, []);
      return (
        <div>
          <Table columns={cols} dataSource={dataTable} bordered />
        </div>
      );
    };

    return (
      <div className="w-[650px] flex flex-col gap-3 text-sm">
        <p className="text-xl font-medium">Diễn giải chi tiết (VND)</p>

        <div className="w-full flex-between gap-3 font-bold">
          <p className="">Lương GROSS</p>
          <p className="">{convertCurrency(salary)}</p>
        </div>

        {/* bhxh */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Bảo hiểm xã hội ({bhxh * 100}%)</p>
          <p className="">{convertCurrency(-Math.round(salaryBHXH))}</p>
        </div>

        {/* bhyt */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Bảo hiểm y tế ({bhyt * 100}%)</p>
          <p className="">{convertCurrency(-Math.round(salaryBHYT))}</p>
        </div>

        {/* bhtn */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Bảo hiểm thất nghiệp ({bhtn * 100}%)</p>
          <p className="">{convertCurrency(-Math.round(salaryBHTN))}</p>
        </div>

        {/* earning before fax */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Thu nhập trước thuế</p>
          <p className="">{convertCurrency(Math.round(earningBeforeFax))}</p>
        </div>

        {/* reduce family personal wage */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Giảm trừ gia cảnh bản thân</p>
          <p className="">
            {convertCurrency(-Math.round(personalFamilyReduceWage))}
          </p>
        </div>

        {/* reduce family dependentce wage */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Giảm trừ gia cảnh phụ thuộc</p>
          <p className="">
            {convertCurrency(-Math.round(dependentWage * peopleDependentce))}
          </p>
        </div>

        {/* earning fax */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Thu nhập chịu thuế</p>
          <p className="">{convertCurrency(Math.round(earningFax))}</p>
        </div>

        {/* earning personal */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Thu nhập cá nhân</p>
          <p className="">
            {convertCurrency(
              -Math.round(calculateEarningPersonalGross(earningFax))
            )}
          </p>
        </div>

        {/* wage NET */}
        <div className="w-full flex-between gap-3 font-bold">
          <p className="">Lương NET</p>
          <p className="">
            {convertCurrency(
              Math.round(
                earningBeforeFax - calculateEarningPersonalGross(earningFax)
              )
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 py-3 border-y-2 border-solid border-indigo-200">
          <p className="text-lg font-medium">
            Chi tiết thuế thu nhập cá nhân (VND)
          </p>

          {/* table earning personal details */}
          <TableEarningPersonalDetail
            val={Math.round(calculateEarningPersonalGross(earningFax))}
          />
        </div>
      </div>
    );
  };

  const ContentCalculateNetToGross = () => {
    const TableEarningPersonalDetail = ({ val }) => {
      let arrEarning = [250000, 500000, 1200000, 2800000, 5000000, 8400000, 0];
      let arrLevelTax = [
        "Đến 5 triệu VND",
        "Trên 5 đến 10 triệu VND",
        "Trên 10 đến 18 triệu VND",
        "Trên 18 đến 32 triệu VND",
        "Trên 32 đến 52 triệu VND",
        "Trên 52 đến 80 triệu VND",
        "Trên 80 triệu VND",
      ];
      let arrTax = ["5%", "10%", "15%", "20%", "25%", "30%", "35%"];

      const cols = useMemo(
        () => [
          {
            title: "Mức chịu thuế",
            dataIndex: "levelTax",
            key: "levelTax",
            render: (text) => <p>{text}</p>,
          },
          {
            title: "Thuế suất",
            dataIndex: "Tax",
            key: "Tax",
            render: (text) => <p className="text-end">{text}</p>,
          },
          {
            title: <p className="text-end">Tiền nộp</p>,
            dataIndex: "payment",
            key: "payment",
            render: (text) => <p className="text-end">{text}</p>,
          },
        ],
        []
      );

      const dataTable = useMemo(() => {
        let result = [];
        let sum = 0;
        let sumPrev = 0;

        for (let i = 0; i < arrEarning.length; i++) {
          sum += arrEarning[i];
          if (val > sum) {
            if (i === arrEarning.length - 1) {
              result.push(val - sumPrev);
            }
            result.push(arrEarning[i]);
          } else {
            if (val > sumPrev) {
              result.push(val - sumPrev);
            } else {
              result.push(0);
            }
          }
          sumPrev += arrEarning[i];
        }

        let arrResult = [];
        arrResult = result.map((paymenI, idx) => ({
          key: { idx },
          levelTax: arrLevelTax[idx],
          Tax: arrTax[idx],
          payment: convertCurrency(paymenI),
        }));

        return arrResult;
      }, []);

      return (
        <div>
          <Table columns={cols} dataSource={dataTable} bordered />
        </div>
      );
    };
    return (
      <div className="w-[650px] flex flex-col gap-3 text-sm">
        <p className="text-xl font-medium">Diễn giải chi tiết (VND)</p>

        <div className="w-full flex-between gap-3 font-bold">
          <p className="">Lương GROSS</p>
          <p className="">{convertCurrency(resultNetToGross)}</p>
        </div>

        {/* bhxh */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Bảo hiểm xã hội ({bhxh * 100}%)</p>
          <p className="">
            {convertCurrency(-Math.round(resultNetToGross * bhxh))}
          </p>
        </div>

        {/* bhyt */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Bảo hiểm y tế ({bhyt * 100}%)</p>
          <p className="">
            {convertCurrency(-Math.round(resultNetToGross * bhyt))}
          </p>
        </div>

        {/* bhtn */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Bảo hiểm thất nghiệp ({bhtn * 100}%)</p>
          <p className="">
            {convertCurrency(-Math.round(resultNetToGross * bhtn))}
          </p>
        </div>

        {/* earning before fax */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Thu nhập trước thuế</p>
          <p className="">
            {convertCurrency(earningPersonalFax + Number(salary))}
          </p>
        </div>

        {/* reduce family personal wage */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Giảm trừ gia cảnh bản thân</p>
          <p className="">
            {convertCurrency(-Math.round(personalFamilyReduceWage))}
          </p>
        </div>

        {/* reduce family dependentce wage */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Giảm trừ gia cảnh phụ thuộc</p>
          <p className="">
            {convertCurrency(-Math.round(dependentWage * peopleDependentce))}
          </p>
        </div>

        {/* earning fax */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Thu nhập chịu thuế</p>
          <p className="">{convertCurrency(-Math.round(earningFaxNet))}</p>
        </div>

        {/* earning personal */}
        <div className="w-full flex-between gap-3 ">
          <p className="">Thu nhập cá nhân</p>
          <p className="">{convertCurrency(earningPersonalFax)}</p>
        </div>

        {/* wage NET */}
        <div className="w-full flex-between gap-3 font-bold">
          <p className="">Lương NET</p>
          <p className="">{convertCurrency(salary)}</p>
        </div>

        <div className="flex flex-col gap-3 py-3 border-y-2 border-solid border-indigo-200">
          <p className="text-lg font-medium">
            Chi tiết thuế thu nhập cá nhân (VND)
          </p>

          {/* table earning personal details */}
          <TableEarningPersonalDetail val={Math.round(earningPersonalFax)} />
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-8 py-4 px-6 bg-white rounded-md drop-shadow border border-solid border-slate-300">
      <div className="w-full flex-center gap-5 p-1 rounded-md border-2 border-solid border-gray-200">
        <button
          className={`w-full p-2 rounded-md  ${
            isActive
              ? "bg-indigo-200 border-2 border-solid border-indigo-300"
              : "hover:bg-indigo-100"
          }
                        `}
          onClick={() => setIsActive(true)}
        >
          Gross &#10132; Net
        </button>

        <button
          className={`w-full p-2 rounded-md  ${
            !isActive
              ? "bg-indigo-200 border-2 border-solid border-indigo-300"
              : "hover:bg-indigo-100"
          }
                        `}
          onClick={() => setIsActive(false)}
        >
          Net &#10132; Gross
        </button>
      </div>

      <form
        className="flex flex-col gap-2 "
        onSubmit={(e) => e.preventDefault()}
      >
        {/* salary */}
        <div className="flex-between gap-4">
          {/* salary */}
          <div className="w-5/6">
            {isActive ? (
              <label className="flex items-center gap-2 ">
                Lương Gross
                <Popover trigger="hover" content={contentWhatIsGross}>
                  <span className="font-medium text-lg text-gray-600 cursor-pointer hover:text-black">
                    <BsQuestionSquareFill />
                  </span>
                </Popover>
              </label>
            ) : (
              <label className="flex items-center gap-2 ">
                Lương Net
                <Popover trigger="hover" content={contentWhatIsNet}>
                  <span className="font-medium text-lg text-gray-600  cursor-pointer hover:text-black">
                    <BsQuestionSquareFill />
                  </span>
                </Popover>
              </label>
            )}

            <div className="border border-solid border-gray-400 px-4 py-2 mt-1 mx-2 rounded-md">
              <CurrencyInput
                id="salary"
                name="salary"
                value={salary}
                className="w-full outline-none"
                decimalsLimit={2}
                onValueChange={(value) => setSalary(value)}
              />
            </div>
          </div>

          {/* convert vnd==usd */}
          <div className="w-1/6 flex-center gap-2 p-1 mt-7 rounded-md border border-solid border-gray-400">
            <button
              className={`w-full p-[2px] rounded-md  ${
                isVND
                  ? "bg-indigo-200 border-2 border-solid border-indigo-300"
                  : "hover:bg-indigo-100"
              }
                                `}
              onClick={() => setIsVND(true)}
            >
              VND
            </button>

            <button
              className={`w-full p-[2px] rounded-md  ${
                !isVND
                  ? "bg-indigo-200 border-2 border-solid border-indigo-300"
                  : "hover:bg-indigo-100"
              }
                                `}
              onClick={() => setIsVND(false)}
            >
              USD
            </button>
          </div>
        </div>

        {/* people dependence */}
        <div className="">
          <label className="flex items-center gap-2 ">
            Số người phụ thuộc
            <Popover
              trigger="hover"
              placement="right"
              content={contentTextPeopleDependent}
            >
              <span className="font-medium text-lg text-gray-600  cursor-pointer hover:text-black">
                <BsQuestionSquareFill />
              </span>
            </Popover>
          </label>

          <div className="w-32 border border-solid border-gray-400 px-4 py-2 mt-1 mx-2 rounded-md">
            <CurrencyInput
              id="peopleDependentce"
              name="peopleDependentce"
              value={peopleDependentce}
              className="outline-none w-full"
              decimalsLimit={2}
              onValueChange={(value) => setPeopleDependentce(value)}
            />
          </div>
        </div>

        {/* insurance */}
        <div className="flex-between gap-4">
          {/* insurance */}
          <div className="w-1/2">
            <label className="flex items-center gap-2 ">
              Đóng bảo hiểm dựa trên
            </label>

            <Select
              defaultValue="primary"
              style={{
                width: "100%",
                marginLeft: "10px",
                marginTop: "5px",
                height: "42px",
                border: "1px solid gray",
                borderRadius: "6px",
              }}
              allowClear
              value={insurance}
              onChange={(val) => setInsurance(val)}
              options={[
                { value: "primary", label: "Lương chính thức" },
                { value: "diff", label: "Khác" },
              ]}
            />
          </div>

          {/* closing rate insurance */}
          <div className="w-1/2">
            <label className="flex items-center gap-2">
              Mức lương đóng bảo hiểm
            </label>

            {insurance === "primary" ? (
              <div className="w-full border border-solid border-gray-400  mt-1 mx-2 rounded-md">
                <CurrencyInput
                  id="salary-default"
                  name="salary-default"
                  value={salary}
                  className="outline-none w-full bg-slate-100 border-gray-50 text-gray-500 px-4 py-2 rounded-md"
                  decimalsLimit={2}
                  disabled
                />
              </div>
            ) : (
              <div className="w-full border border-solid border-slate-200 px-4 py-2 mt-1 mx-2 rounded-md">
                <CurrencyInput
                  id="salaryInsurance"
                  name="salaryInsurance"
                  value={salaryInsurance}
                  className="outline-none w-full"
                  decimalsLimit={2}
                  onChange={(val) => setSalaryInsurance(val)}
                />
              </div>
            )}
          </div>
        </div>

        {/* region */}
        <div className="">
          <label className="flex items-center gap-2 ">
            Vùng
            <span
              className="font-medium text-lg text-gray-600  cursor-pointer hover:text-black"
              onClick={() => setIsModalRegionDescOpen(true)}
            >
              <BsQuestionSquareFill />
            </span>
          </label>

          <Select
            defaultValue="I"
            style={{
              width: "100%",
              marginLeft: "10px",
              marginTop: "5px",
              height: "42px",
              border: "1px solid gray",
              borderRadius: "6px",
            }}
            value={region}
            onChange={(val) => setRegion(val)}
            options={[
              { value: "I", label: "Vùng I" },
              { value: "II", label: "Vùng II" },
              { value: "III", label: "Vùng III" },
              { value: "IV", label: "Vùng IV" },
            ]}
          />

          <Modal
            title="Vùng"
            open={isModalRegionDescOpen}
            footer={null}
            width={750}
            style={{ top: 10 }}
            onCancel={() => setIsModalRegionDescOpen(false)}
          >
            <ContentTextRegion />
          </Modal>
        </div>
      </form>

      {/* result */}
      <div className="px-8 py-5 flex flex-col rounded-md bg-indigo-100 drop-shadow-sm gap-4">
        <div className="w-full flex-between">
          <p className="font-medium ">
            Kết quả tính lương{" "}
            <span className="text-gray-500">(1 USD = 24,500 VND)</span>
          </p>

          <p
            className="text-indigo-500 font-medium cursor-pointer"
            onClick={() => setIsModalCalculateOpen(true)}
          >
            Xem chi tiết
          </p>

          <Modal
            title="Kết quả tính lương"
            open={isModalCalculateOpen}
            footer={null}
            width={700}
            style={{ top: 10 }}
            onCancel={() => setIsModalCalculateOpen(false)}
          >
            {isActive ? (
              <ContentCalculateGrossToNet />
            ) : (
              <ContentCalculateNetToGross />
            )}
          </Modal>
        </div>

        {/* Gross --> Net */}
        <div className="w-full flex-between">
          {/* Gross */}
          <div className="w-[45%] flex-center flex-col gap-3 bg-white rounded-md p-4">
            {isActive ? (
              <>
                <p className="font-bold uppercase">gross</p>
              </>
            ) : (
              <>
                <p className="font-bold uppercase">net</p>
              </>
            )}
            <p className="text-xl font-bold text-red-500">
              {salary ? convertCurrencyVND(Number(salary)) : 0}
            </p>

            <p className="text-gray-500">
              {salary ? convertVNDToUSD(salary) : 0} USD
            </p>
          </div>

          <div className="w-[5%] flex-center">
            <p className="font-bold text-xl">
              <FaLongArrowAltRight />
            </p>
          </div>

          {/* Net */}
          <div className="w-[45%] flex-center flex-col gap-3 bg-white rounded-md p-4">
            {isActive ? (
              <>
                <p className="font-bold uppercase">net</p>

                <p className="text-xl font-bold text-red-500">
                  {salary
                    ? convertCurrencyVND(
                        earningBeforeFax -
                          calculateEarningPersonalGross(earningFax)
                      )
                    : 0}
                </p>

                <p className="text-gray-500">
                  {salary
                    ? convertVNDToUSD(
                        earningBeforeFax -
                          calculateEarningPersonalGross(earningFax)
                      )
                    : 0}{" "}
                  USD
                </p>
              </>
            ) : (
              <>
                <p className="font-bold uppercase">gross</p>

                <p className="text-xl font-bold text-red-500">
                  {salary
                    ? resultNetToGross > 0
                      ? convertCurrencyVND(resultNetToGross)
                      : "0 VND"
                    : "0 VND"}{" "}
                  {console.log(resultNetToGross)}
                  {console.log(convertCurrencyVND(resultNetToGross))}
                </p>

                <p className="text-gray-500">
                  {salary
                    ? convertVNDToUSD(resultNetToGross) > 0
                      ? convertVNDToUSD(resultNetToGross)
                      : 0
                    : 0}{" "}
                  USD
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GrossNet = () => {
  const [isModalRegionDescOpen, setIsModalRegionDescOpen] = useState(false);

  return (
    <div>
      <Nav />
      <section className="py-20 bg-[#F0F2F5] min-h-screen px-48 w-full">
        {/* header */}
        <div className="h-10 flex items-center">
          <div className="h-full flex gap-1">
            <Link to="/">
              <p className="text-base cursor-pointer font-medium text-indigo-500 hover:text-indigo-700">
                Trang chủ
              </p>
            </Link>
            <p className="mx-1 font-bold"> &#62;</p>
            <p className="text-base cursor-pointer font-medium text-indigo-500 hover:text-indigo-700">
              Tính Gross-Net
            </p>
          </div>
        </div>

        {/* body */}
        <div className="flex gap-4 bg-gray-100 w-full">
          {/* left */}
          <div className=" w-3/4 flex flex-col gap-4">
            <div className="flex flex-col gap-4 py-4 px-6 bg-white drop-shadow-md rounded-md min-h-80 ">
              <div className="flex flex-col gap-2">
                <p className="font-medium text-xl">
                  Công cụ tính lương Gross sang Net và ngược lại [Chuẩn 2024]
                </p>

                <p className="">
                  Áp dụng mức giảm trừ gia cảnh mới nhất 11 triệu đồng/tháng
                  (132 triệu đồng/năm) với nguời nộp thuế và 4,4 triệu
                  đồng/tháng với mỗi người phụ thuộc (Theo Nghị quyết số
                  954/2020/UBTVQH14)
                </p>

                <p className="">
                  Áp dụng
                  <span
                    className="font-medium text-indigo-500 px-1 cursor-pointer"
                    onClick={() => setIsModalRegionDescOpen(true)}
                  >
                    mức lương tối thiểu vùng
                  </span>
                  <Modal
                    title="Vùng"
                    open={isModalRegionDescOpen}
                    footer={null}
                    width={750}
                    style={{ top: 10 }}
                    onCancel={() => setIsModalRegionDescOpen(false)}
                  >
                    <ContentTextRegion />
                  </Modal>
                  mới nhất có hiệu lực từ ngày 01/07/2022 (Theo điều 3, Nghị
                  định 38/2022/NĐ-CP
                </p>

                <p className="">
                  Áp dụng quy định từ 01/07/2023{" "}
                  <span className="text-red-500">(Mới nhất)</span>{" "}
                </p>

                <div className="flex-between w-full py-3 px-4 bg-indigo-50 rounded-md border-2 border-dashed border-indigo-200">
                  <div className="flex flex-col gap-2">
                    <p>Lương cơ sở:</p>
                    <p className="text-indigo-600">
                      {currencyFormat(basicWage)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Giảm trừ gia cảnh bản thân:</p>
                    <p className="text-indigo-600">
                      {currencyFormat(personalFamilyReduceWage)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Người phụ thuộc:</p>
                    <p className="text-indigo-600">
                      {currencyFormat(dependentWage)}
                    </p>
                  </div>
                </div>
              </div>

              <FormCalculate />

              {/* policy */}
              <div className="">
                <p className="">
                  Theo Nghị định số 24/2023/NĐ-CP của Chính phủ hiệu lực từ ngày
                  1/7/2023
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 py-4 px-6 bg-white drop-shadow-md rounded-md min-h-80">
              <Intro />
            </div>
          </div>

          {/* right */}
          <div className=" w-1/4 flex flex-col gap-4">
            <div className="flex flex-col gap-2 bg-white drop-shadow-md rounded-md min-h-80 p-3">
              <div className="w-full flex-center min-h-32">
                <Image src={budgetFlatIcon} alt="budget" className="w-28" />
              </div>

              <p className="font-medium">
                Bên cạnh lương, đâu là những yếu tố cần quan tâm khi tìm việc?
              </p>
              <p className="text-gray-500">
                Dù tiền lương là yếu tố quan trọng hàng đầu để thu hút ứng cử
                viên xin việc, song để làm việc lâu dài và phát triển sự nghiệp
                của bản thân tại công ty thì bạn cần nhiều hơn thế. Vậy bên cạnh
                lương, đâu là những yếu tố cần quan tâm khi tìm việc?
              </p>
              <ul className="text-gray-500 list-disc pl-4">
                <li>Địa điểm làm việc</li>
                <li>Trang thiết bị làm việc</li>
                <li>Phúc lợi</li>
                <li>Cơ hội thăng tiến</li>
                <li>Môi trường làm việc</li>
              </ul>

              <p className="font-medium">
                Đàm phán lên lương – Nói sao cho khéo?
              </p>
              <p className="text-gray-500">
                Đàm phán lên lương chính là việc thảo luận về cơ hội tiếp tục
                hợp tác nhưng với mức lương cao hơn do số năm kinh nghiệm và
                hiệu quả công việc trong thời gian vừa rồi của bạn đều tăng.
                Cuộc đàm phán lên lương sẽ hiệu quả nhất khi cấp trên hiểu được
                rằng việc trả lương cho bạn sẽ xứng đáng với các kĩ năng và công
                sức, kinh nghiệm của bạn khi làm việc tại công ty, doanh nghiệp.
              </p>
            </div>
          </div>
        </div>

        {/* intro */}

        {/*  */}
      </section>
      <Footer />
    </div>
  );
};

export default GrossNet;
