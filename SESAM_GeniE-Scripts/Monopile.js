//Exported using: GeniE V7.10-03 started 27-Oct-2021 10:32:44
//Units
GenieRules.Units.setInputUnit(Angle, "deg");

//***** PROPERTIES *****//
//Sections
Monopile = PipeSection(6 m, 0.06 m);

//Materials
Steel = MaterialLinear(550000000 Pa, 8500 kg/m^3, 2.1e+11 Pa, 0.3, 1.2e-05 delC^-1, 0.03 N*s/m);

//Pile Characteristics
PileType1 = PileCharacteristics(0 kg/m^3, tcInfinite);

//Regular Wave Sets
WaveSet1 = RegularWaveSet();
WaveSet1.add(RegularWave(0 deg, 6 m, WavePeriod(10 s), 0 deg));

//Seabed Deltas
Scour1 = Scour(20 m, 0.1 m, 5 deg);

//Soil Types
Soil1 = Sand(false, 1, 1990 kg/m^3, 30 deg, 0 Pa/m);
Soil2 = Clay(false, 1, 1950 kg/m^3, 0.1, 200 Pa, 0 m, 100 Pa, -100 m);
Soil2.apiJFactor = 0.5;


//Soil Data and Soil Curves
SoilCurves1 = SoilCurves(pyAPI1987, tzAPI1993, qzAPI1993);
SoilData1 = SoilData(-1 Pa, 0.3, 45 Pa, 45 Pa, 0.01, 0 Pa, 0.05);
SoilData2 = SoilData(-1 Pa, 0.3, 120 Pa, 120 Pa, 0.01, 0 Pa, 0.05);
SoilData3 = SoilData(-1 Pa, 0.3, 100 Pa, 100 Pa, 0.01, 30000 Pa, 0.05);

//***** RULES *****//
//Compatibility Rules
GenieRules.Compatibility.version = "V7.10-3";
GenieRules.Compatibility.enable(SetDefaultNames, true);
GenieRules.Compatibility.enable(CaseInsensitiveFunctions, true);
GenieRules.Compatibility.enable(JournalledDefaultPrefix, true);
GenieRules.Compatibility.enable(SimplifyTopologyEnhancedVertexRemoval, true);
GenieRules.Compatibility.enable(PlateSnapping, true);
GenieRules.Compatibility.enable(PlateSortingCOGFirst, true);
GenieRules.Compatibility.enable(CurveSnapping, true);
GenieRules.Compatibility.enable(DefaultLongFemNames, true);
GenieRules.Compatibility.enable(DefaultEccentricHinghes, true);
GenieRules.Compatibility.enable(AutomaticallySaveModelAfterAnalysis, false);
GenieRules.Compatibility.enable(ValidateTransforms, true);
GenieRules.Compatibility.enable(CheckPlatesForErrorsDuringCreation, true);
GenieRules.Compatibility.enable(UseTopologySimplificationVersion7, true);
GenieRules.Compatibility.enable(UseSpliceVersionV, true);
GenieRules.Compatibility.enable(PreferLinearDependencies, true);
GenieRules.Compatibility.enable(PostponeFEMFileWrite, true);
GenieRules.Compatibility.enable(PostponeLoadApplication, true);
GenieRules.Compatibility.enable(UseSestra10, true);
GenieRules.Compatibility.enable(BucklingCapacityForSegmentedMembers, true);
GenieRules.Compatibility.enable(AlternativeJointBraceClassification, true);
GenieRules.Compatibility.enable(UseAutoSegmentation, false);
GenieRules.Compatibility.enable(AccurateCorrosionAddition, true);

//Connected Move Rules
GenieRules.ConnectedMove.useStructuralPoints = false;
GenieRules.ConnectedMove.defaultConnected = false;
GenieRules.ConnectedMove.rearrangeXJoints = false;

//Geometry Rules
GenieRules.Geometry.beamTopologySnapping = true;
GenieRules.Geometry.guideCurveTopologySnapping = true;
GenieRules.Geometry.creationGrouping = cgGroupingOff;

//Joint Creation Rules
GenieRules.JointCreation.autoGenerate = false;
GenieRules.JointCreation.selectionAware = false;
GenieRules.JointCreation.exclude(geFreeThroughBeams, true);
GenieRules.JointCreation.exclude(geThroughBeamPure, true);
GenieRules.JointCreation.exclude(geThroughBeams, false);
GenieRules.JointCreation.exclude(geFreeBeamEnds, true);
GenieRules.JointCreation.exclude(ge2BeamAligned, true);
GenieRules.JointCreation.exclude(geBeamEnds, false);

//JointDesign Rules
GenieRules.JointDesign.setDefaultCanRule(0.25, 0.3 m);
GenieRules.JointDesign.setDefaultStubRule(1, 0.6 m);
GenieRules.JointDesign.coneAngle = 9.462322208 deg;
GenieRules.JointDesign.minimumGap = 0.0508 m;
GenieRules.JointDesign.gapTolerance = 0.001 m;
GenieRules.JointDesign.planeTolerance = 1 deg;
GenieRules.JointDesign.braceAngleMoveLimit = 10 deg;
GenieRules.JointDesign.chordAlignmentTolerance = 5 deg;
GenieRules.JointDesign.flushBraces = false;
GenieRules.JointDesign.flushBraces = false;
GenieRules.JointDesign.iterations = 2;
GenieRules.JointDesign.AutoAdjustSegmentLength = false;

//Local Joint Flexibility (LJF) Rules
GenieRules.LJF.method = ljfBuitrago1993;
GenieRules.LJF.setLimit(ljfAxial, 0.1, 5);
GenieRules.LJF.setLimit(ljfIPB, 0.1, 5);
GenieRules.LJF.setLimit(ljfOPB, 0.1, 5);

//Meshing rules
GenieRules.Meshing.elementType = mp1stOrder;
GenieRules.Meshing.superElementType = 1;
GenieRules.Meshing.autoSimplifyTopology = true;
GenieRules.Meshing.autoSplitPeriodicGeometry = false;
GenieRules.Meshing.repairSplitTopology = false;
GenieRules.Meshing.preference(mpPreferRectangularMesh, false);
GenieRules.Meshing.preference(mpAllowTriangularElements, true);
GenieRules.Meshing.preference(mpPreferPointMassAsNodeMass, true);
GenieRules.Meshing.preference(mpUseDrillingElements, false);
GenieRules.Meshing.preference(mpUseEccentricHinges, true);
GenieRules.Meshing.eliminateInternalEdges = true;
GenieRules.Meshing.eliminateInternalVertices = true;
GenieRules.Meshing.preference(mpIncludeUnusedProperties, false);
GenieRules.Meshing.preference(mpEliminateInternalEccentricities, false);
GenieRules.Meshing.preference(mpIgnoreFilletRadius, false);
GenieRules.Meshing.preference(mpPreferLinearDependencies, true);
GenieRules.Meshing.preference(mpUseLongLoadcaseNames, true);
GenieRules.Meshing.preference(mpUseLongSetNames, true);
GenieRules.Meshing.preference(mpUseLongPropertyNames, true);
GenieRules.Meshing.preference(mpMeshDensityRounded, false);
GenieRules.Meshing.scantlings = msGross;
GenieRules.Meshing.ignoreEccentricities = false;
GenieRules.Meshing.useCocentricBeams = false;
GenieRules.Meshing.faceMeshStrategy = SesamQuadMesher;
GenieRules.Meshing.edgeMeshStrategy = UniformDistributionEdge;
GenieRules.Meshing.activate(mpMaxAngle, mpFail, true);
GenieRules.Meshing.setLimit(mpMaxAngle, mpFail, 179 deg);
GenieRules.Meshing.activate(mpMaxAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxAngle, mpSplit, 165 deg);
GenieRules.Meshing.activate(mpMinAngle, mpFail, false);
GenieRules.Meshing.setLimit(mpMinAngle, mpFail, 1 deg);
GenieRules.Meshing.activate(mpMinAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMinAngle, mpSplit, 15 deg);
GenieRules.Meshing.activate(mpMaxRelativeJacobi, mpFail, false);
GenieRules.Meshing.setLimit(mpMaxRelativeJacobi, mpFail, 10);
GenieRules.Meshing.activate(mpMaxRelativeJacobi, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxRelativeJacobi, mpSplit, 5);
GenieRules.Meshing.activate(mpMinNormalizedJacobi, mpFail, false);
GenieRules.Meshing.setLimit(mpMinNormalizedJacobi, mpFail, 0);
GenieRules.Meshing.activate(mpMinNormalizedJacobi, mpSplit, false);
GenieRules.Meshing.setLimit(mpMinNormalizedJacobi, mpSplit, 0.2);
GenieRules.Meshing.activate(mpMinEdge, false);
GenieRules.Meshing.setLimit(mpMinEdge, 0.1);
GenieRules.Meshing.activate(mpMinEdgeByLength, false);
GenieRules.Meshing.setLimit(mpMinEdgeByLength, 0 m);
GenieRules.Meshing.activate(mpMinNonConceptualEdge, false);
GenieRules.Meshing.setLimit(mpMinNonConceptualEdge, 1);
GenieRules.Meshing.activate(mpMaxChord, false);
GenieRules.Meshing.setLimit(mpMaxChord, 0.2);
GenieRules.Meshing.activate(mpMaxTwistAngle, mpFail, false);
GenieRules.Meshing.setLimit(mpMaxTwistAngle, mpFail, 30 deg);
GenieRules.Meshing.activate(mpMaxTwistAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxTwistAngle, mpSplit, 10 deg);
GenieRules.Meshing.activate(mpMinMaxDensityRatio, false);
GenieRules.Meshing.setLimit(mpMinMaxDensityRatio, 0.1);
GenieRules.Meshing.basicLCfactor = 1;
GenieRules.Meshing.analysisFolders = true;
GenieRules.Meshing.preference(mpAdjustNumberOfElements, true);
GenieRules.Meshing.useUniformizedFaceParameterization = false;
GenieRules.Meshing.longitudinalMassOnNonStructuralElements = true;

//Tolerances Rules
GenieRules.Tolerances.angleTolerance = 2 deg;
GenieRules.Tolerances.pointTolerance = 0.01 m;
GenieRules.Tolerances.useTolerantModelling = true;

//Set Rules
GenieRules.Sets.scriptCompact = true;

//Beam Creation Rules
GenieRules.BeamCreation.DefaultCurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

//Beam Creation Rules
GenieRules.Transformation.CopyTransformerMethod = tmUseModelTransformer;

//***** STRUCTURE *****//
//Beams
Steel.setDefault();
Monopile.setDefault();
Bm1 = Beam(Point(0 m,0 m,10 m), Point(0 m,0 m,-20 m));
Bm1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());
Pile1 = Pile(Point(0 m,0 m,-20 m), Point(0 m,0 m,-35 m));
Pile1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

//Plates
//Unable to export Shell: Pl1

//***** GUIDING GEOMETRY *****//
//Guiding Geometry
Base = GuidePlane(Point(-10 m,-10 m,10 m), Point(10 m,-10 m,10 m), Point(10 m,10 m,10 m), Point(-10 m,10 m,10 m), 2, 2, 1, 1, 1, 1);
MSL = GuidePlane(Point(-10 m,-10 m,0 m), Point(10 m,-10 m,0 m), Point(10 m,10 m,0 m), Point(-10 m,10 m,0 m), 2, 2, 1, 1, 1, 1);
Mudline = GuidePlane(Point(-10 m,-10 m,-20 m), Point(10 m,-10 m,-20 m), Point(10 m,10 m,-20 m), Point(-10 m,10 m,-20 m), 2, 2, 1, 1, 1, 1);
Top = GuidePlane(Point(-10 m,-10 m,87.6 m), Point(10 m,-10 m,87.6 m), Point(10 m,10 m,87.6 m), Point(-10 m,10 m,87.6 m), 2, 2, 1, 1, 1, 1);

//***** ENVIRONMENT *****//
//Locations
Location1 = Location(0 m, -20 m);
Location1.gravity = 9.80665 m/s^2;
Location1.air().density = 1.226 kg/m^3;
Location1.air().kinematicViscosity = 1.462e-05 m^2/s;
Location1.water().density = 1025 kg/m^3;
Location1.water().kinematicViscosity = 1.19e-06 m^2/s;
Location1.seabed().normaldirection = Vector3d(0 m,0 m,1 m);
Location1.seabed().seabedDelta = Scour1;
Location1.insertSoilBorder(-25 m);
Location1.insertSoilBorder(-29 m);
Location1.insertSoilBorder(-60 m);
Location1.soil(1).soilCurves = SoilCurves1;
Location1.soil(1).soilData = SoilData1;
Location1.soil(1).soilType = Soil1;
Location1.soil(1).numberOfSublayers = 2;
Location1.soil(2).soilCurves = SoilCurves1;
Location1.soil(2).soilData = SoilData2;
Location1.soil(2).soilType = Soil2;
Location1.soil(2).numberOfSublayers = 3;
Location1.soil(3).soilCurves = SoilCurves1;
Location1.soil(3).soilData = SoilData3;
Location1.soil(3).soilType = Soil2;
Location1.soil(3).numberOfSublayers = 4;

//***** EQUIPMENTS *****//
//***** SETS ( Create ) *****//
//***** LOAD MODELLING AND ANALYSIS *****//
//***** LOAD INTERFACES *****//
//***** MODEL VIEWS *****//
//***** SETS ( Fill ) *****//
